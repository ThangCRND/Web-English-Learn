const db = require('../models');
const { QueryTypes } = require('sequelize');

const Exam = db.exams;
const Answer = db.answers;
const Question = db.questions;

// tạo bài kiểm tra
const createExam = async (req, res) => {
  try {
     // tạo info cơ bản cho bài kiểm tra
    let info = {
      examID: req.body.examID,
      title: req.body.title,
      duration: req.body.duration,
      numberQuestion: req.body.numberQuestion,
      examStatus: req.body.examStatus
    };
     // tạo bài kiểm tra và trả về code 200
    const exam = await Exam.create(info);
    res.status(200).send(exam);
    console.log(exam);
  } catch (err) {
    // trả về code 500 nếu gặp lỗi
    console.error(err);
    res.status(500).send('An error occurred while creating the exam.');
  }
};

// 2. Get all exam
const getAllExams = async (req, res) => {
  const exams = await Exam.findAll({});
  res.send(exams);
}

const getExam = async (req, res) => {
  try {
    // lấy bài kiểm tra dựa theo id
    const examid = req.params.examID; 
    const exam = await Exam.findByPk(examid);

    if (!exam) {
       // nếu bài kiểm tra không tồn tại thì trả về code 404
      return res.status(404).json({ message: 'Exam not found' });
    }
    // trả về code 200 nếu tồn tại
    res.status(200).json(exam);
  } catch (error) {
    // trả về code 500 nếu gặp lỗi server
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving the exam.' });
  }
};

// 3.UpdateExam
const updateExam = async (req, res) => {
  try {
     // lấy bài kiểm tra và cập nhật dựa theo id
    const id = req.params.id;
    const [updatedCount] = await Exam.update(req.body, { where: { examID: id } });

    if (updatedCount === 0) {
      // nếu bài kiểm tra không tồn tại trả về code 404
      console.log(`Exam with ID ${id} does not exist.`);
      return res.status(404).send(`Exam with ID ${id} does not exist.`);
    }
     // trả về code 200 nếu bài kiểm tra được update
    res.status(200).send(`Exam with ID ${id} is updated`);
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred while updating the exam.');
  }
}

// 4.Delete Exam
const deleteExam = async (req, res) => {
  try {
     // lấy trường id trong request
    const id = req.params.examID;

    const isExamID = await Exam.findByPk(id)
     // nếu id bài kiểm tra không tồn tại thì trả về code 400
    if(!isExamID){
      return res.status(400).send('Invalid or non-existent examID.');
    }
    // Nếu xóa  Exam thì cần xóa Question và cả Answer bên trong.
    const deletedAnswer = await  Answer.destroy({where: {examID: id}})

    const deletedQuestion = await Question.destroy({where: {examID: id}});

    const deletedExam = await Exam.destroy({ where: { examID: id } });
     // trả về code 404 nếu không được xóa
    if (deletedExam === 0 && deletedQuestion === 0 && deletedAnswer === 0) {
      console.log(`Exam with ID ${id} does not exist.`);
      return res.status(404).send(`Exam with ID ${id} does not exist.`);
    }
    // trả về code 200 nếu bài đẫ đợc xóa thành công
    res.status(200).send('Exam is deleted');
  } catch (error) {
    console.log(error);
    // trả về code 500 nếu gặp lỗi
    res.status(500).send('An error occurred while deleting the exam.');
    
  }

}
// lấy thời lượng làm bài
const getDuration = async(req,res) =>{
  try{
    const examID = req.params.examID
    // query thời lượng làm bài băng id
    const queryDuration = "SELECT duration FROM exams WHERE examID = :examID"
    const duration = await db.sequelize.query(queryDuration, {
      replacements: {examID: examID },
      type: QueryTypes.SELECT,
    });
     // nếu không lấy được thời lượng trả về code 404
  if (!duration) {
    return res.status(404).json({ message: 'Duration not found' });
  }
  res.status(200).json(duration);
  }catch(error){
    // nếu gặp lỗi trả về code 500
    res.status(500).send("Get Duration error: ",error);
  }
}



module.exports = {
  createExam,
  getAllExams,
  updateExam,
  deleteExam,
  getExam,
  getDuration
}