const db = require('../models');
const { QueryTypes } = require('sequelize');


const Question = db.questions;
const Exam = db.exams;
const Answer = db.answers;

// 1. Tạo câu hỏi
const createQuestion = async (req, res) => {
  try {
    const idExam = req.params.examID;
    const { questionID, option1, option2, option3, option4, attach, examID, questionText, answerID, correctAnswer } = req.body;
    // Kiểm tra examID trên Params và Body xem có giá trị hợp lệ không.
    const isExamBody = await Exam.findByPk(examID);
    const isExamParam = await Exam.findByPk(idExam);
    if (!isExamBody || !isExamParam) {
      return res.status(404).send('Invalid or non-existent examID.');
    }

    const queryExam = `
      SELECT numberQuestion AS "LimitQuest" FROM exams WHERE examID = :examID
      `;
    const queryQuestion = `
      SELECT COUNT(examID) AS "NumberQuest" FROM questions WHERE examID = :examID
      `;
    // 1. Lấy được số NumberQuestion có trong 1 exam và LimitQuest 
    const limitNumQuest = await db.sequelize.query(queryExam, {
      replacements: { examID: idExam },
      type: QueryTypes.SELECT
    });
    const numQuestExam = await db.sequelize.query(queryQuestion, {
      replacements: { examID: idExam },
      type: QueryTypes.SELECT
    });

    // Điều kiện check xem có thông số NumQuest và LimitQuest
    if (limitNumQuest.length > 0 && numQuestExam.length > 0) {
      var numberQuestion = numQuestExam[0].NumberQuest;
      var limitQuestion = limitNumQuest[0].LimitQuest;
      console.log("Number Question in Exam: ", numberQuestion);
      console.log("Limit Question in Exam: ", limitQuestion);

    } else {
      res.status(404).json({ error: 'No questions found for the given examID' });
    }

    const dataQuest = {
      questionID,
      examID,
      questionText,
      option1,
      option2,
      option3,
      option4,
      attach
    };
    const dataAns = {
      answerID,
      questionID,
      examID,
      correctAnswer
    }
    // Chặn việc question tạo mà answer trống ko đc tạo.
    if (dataQuest.questionID === null || dataQuest.examID === null || dataAns.answerID === null || dataAns.questionID === null || dataAns.examID === null || dataAns.correctAnswer === null) {
      console.log(`Fetching Data error.`);
      return res.status(404).send(`Cannot created with ID ${questionID}.`);
    }
    if (numberQuestion >= limitQuestion) {
      const isValidCreate = false;
      return res.status(200).send({ isValidCreate: isValidCreate })
    } else {
      const isValidCreate = true;
      const question = await Question.create(dataQuest);
      const answer = await Answer.create(dataAns);
      res.status(200).send({ question, answer, isValidCreate });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while creating the question.');
  }
};


// 4. Get Questions in Exam
const getQuestionsInExam = async (req, res) => {
  try {
    const examID = req.params.examID;
    const query = `
  SELECT questions.questionID, answers.answerID, questions.examID,questionText, option1, option2, option3, option4, correctAnswer, attach
  FROM questions
  LEFT JOIN answers ON questions.questionID = answers.questionID
  WHERE questions.examID = :examID
  ORDER BY questions.questionID
`;
    const questions = await db.sequelize.query(query, {
      replacements: { examID: examID },
      type: QueryTypes.SELECT
    });
    res.status(200).json(questions);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}


// 3. Delete question - vì question và answer ràng buộc nên phải đồng thời xóa.
const deleteQuestion = async (req, res) => {
  try {
    const questionID = req.params.questID;
    const isQuestID = await Question.findByPk(questionID);
    if (!isQuestID) {
      return res.status(404).send('Invalid or non-existent questionID.');
    }
    const deletedAnswer = await Answer.destroy({ where: { questionID: questionID } });
    const deletedQuestion = await Question.destroy({ where: { questionID: questionID } });

    if (deletedAnswer === 0 || deletedQuestion === 0) {
      console.log(`Question with ID ${questionID} does not exist.`);
      return res.status(404).send(`Question with ID ${questionID} does not exist.`);
    }

    res.status(200).send('Question is deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while deleting the question.');
  }
};

// 4. Update question + answer

const updateQuestion = async (req, res) => {
  try {
    const id = req.params.questID;
    if (!id) {
      return res.status(400).send('Invalid question ID.');
    }

    const isQuestID = await Question.findByPk(id);

    if (!isQuestID) {
      return res.status(404).send('Question with the provided ID does not exist.');
    }

    const {
      questionID,
      option1,
      option2,
      option3,
      option4,
      attach,
      questionText,
      correctAnswer,
    } = req.body;

    if (!questionID || !questionText || !correctAnswer) {
      return res.status(400).send('Missing required fields in the request body.');
    }

    const dataQuest = {
      questionID,
      questionText,
      option1,
      option2,
      option3,
      option4,
      attach,
    };

    const dataAns = {
      questionID, 
      correctAnswer,
    };

    const [updatedQuestion] = await Question.update(dataQuest, { where: { questionID: id } });
    const [updatedAnswer] = await Answer.update(dataAns, { where: { questionID: id } });

    if (updatedQuestion === 0 && updatedAnswer === 0) {
      return res.status(404).send(`Question with ID ${id} does not exist.`);
    }
    res.status(200).send(`Question with ID ${id} has been updated`);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while updating the question.');
  }
};

// 5. Get NumberOfQuestionInExam
const getLimitQuest = async(req,res) =>{
  try{
    const examID = req.params.examID;
    const isExamParam = await Exam.findByPk(examID);
    if (!isExamParam ) {
      return res.status(404).send('Invalid or non-existent examID.');
    }
    const queryExam = `
      SELECT numberQuestion AS "LimitQuest" FROM exams WHERE examID = :examID
      `;
    const queryQuestion = `
      SELECT COUNT(examID) AS "NumberQuest" FROM questions WHERE examID = :examID
      `;
    // 1. Lấy được số NumberQuestion có trong 1 exam và LimitQuest 
    const limitNumQuest = await db.sequelize.query(queryExam, {
      replacements: { examID: examID },
      type: QueryTypes.SELECT
    });
    const numQuestExam = await db.sequelize.query(queryQuestion, {
      replacements: { examID: examID },
      type: QueryTypes.SELECT
    });

    if (limitNumQuest.length > 0 && numQuestExam.length > 0) {
      var numberQuestion = numQuestExam[0].NumberQuest;
      var limitQuestion = limitNumQuest[0].LimitQuest;
      console.log("Number Question in Exam: ", numberQuestion);
      console.log("Limit Question in Exam: ", limitQuestion);

    } else {
      res.status(404).json({ error: 'No questions found for the given examID' });
    }

    res.status(200).send({ limitQuest: limitQuestion, questInExam: numberQuestion});

  }catch(error){
    console.error(error);
    res.status(500).send('An error occurred while getting the question.');
  }
}


module.exports = {
  createQuestion,
  deleteQuestion,
  updateQuestion,
  getQuestionsInExam,
  getLimitQuest
}