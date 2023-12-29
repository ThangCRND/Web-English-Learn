const express = require('express');
const cors = require('cors');
const bcrypt = require("bcryptjs");
const cookieSession = require("cookie-session");
const app = express();


// Define CORS options
const corsOptions = {
  credentials: true,    // Credentials = true thì mới quản lí đc session cookie, duy trì phiên làm việc
  origin: 'http://localhost:8081', // sử dụng HTTP cho local development
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "Nhom9-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
)

// Routers

require("./routes/authRouter.js")(app);
require("./routes/userRouter.js")(app);
require("./routes/questionRouter.js")(app);
require("./routes/examRouter.js")(app);
require("./routes/trackingExamRouter.js")(app);
require("./routes/resultRouter.js")(app);
require('./routes/audioRouter.js')(app);
require('./routes/profileRouter.js')(app);



// Testing API
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


//Mỗi khi khởi động lại server mất toàn bộ data nếu force = false
const db = require("./models")

const Role = db.role;
const User = db.user;
const Profile = db.profile;
const Exam =db.exams;
const Question = db.questions;
const Answer = db.answers;


db.sequelize.sync({ force: false }).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial(); // Call initial 
});

async function initial() {
  // Kiểm tra nếu admin đã tồn tại
  const existingAdmin = await User.findOne({ where: { username: 'admin' } });

  if (!existingAdmin) {
    //Tạo role admin user nếu chưa tồn tại
    await Role.create({ id: 1, name: 'user' });
    await Role.create({ id: 2, name: 'admin' });

    const adminUser = await User.create({
      userID: 1,
      username: 'admin',
      email: 'admin@example.com',
      password: bcrypt.hashSync('admin123', 8),
    });
    await adminUser.setRoles([2]);

    await Profile.create({
      userID: 1,
      firstName: 'Thang',
      lastName: 'Do',
      gender: 'male',
      phone: 123456789,
      city: 'BienHoa',
      country: 'VietNam',
      image: '1KNCmI_GZKz-YsDQ9PIsRn0Qof_fUnZNh',
    });

    await Exam.create({
      examID: 270481,
      title: 'Toeic Reading 1',
      duration: 1200,
      numberQuestion: 6,
      examStatus: 'Reading',
    });
    await Exam.create({
      examID: 550884,
      title: 'Toeic Listening 1',
      duration: 1200,
      numberQuestion: 6,
      examStatus: 'Listening',
    });
  
    // tạo initial questions
    await Question.create({
      questionID: 30044,
      examID: 270481,
      questionText: 'The riskiest _____ of the development of new medications are the trials with human subjects.',
      option1: 'proceeds',
      option2: 'perspectives',
      option3: 'installments',
      option4: 'stages',
      attach: null,
    });
    await Question.create({
      questionID: 90068,
      examID: 270481,
      questionText: 'The artist sent _____ best pieces to the gallery to be reviewed by the owner.',
      option1: 'him',
      option2: 'himself',
      option3: 'his',
      option4: 'he',
      attach: null,
    });
    await Question.create({
      questionID: 100739,
      examID: 270481,
      questionText: 'The upscale boutique Jane’s Closet is known for selling the most stylish _____ for young professionals.',
      option1: 'accessorized',
      option2: 'accessorize',
      option3: 'accessorizes',
      option4: 'accessories',
      attach: null,
    });
    await Question.create({
      questionID: 230688,
      examID: 270481,
      questionText: '_____ sales of junk food have been steadily declining indicates that consumers are becoming more health-conscious.',
      option1: 'In addition to',
      option2: 'The fact that',
      option3: 'As long as',
      option4: 'In keeping with',
      attach: null,
    });
    await Question.create({
      questionID: 300268,
      examID: 270481,
      questionText: 'The store’s manager plans to put the new merchandise on display _____ to promote the line of fall fashions.',
      option1: 'soon',
      option2: 'very',
      option3: 'that',
      option4: 'still',
      attach: null,
    });
    await Question.create({
      questionID: 310378,
      examID: 550884,
      questionText: 'What are the speakers mainly discussing?',
      option1: 'A recent vacation',
      option2: 'An art class',
      option3: 'Plans for the weekend',
      option4: 'Their work schedules',
      attach: '1OBTRyNAdbtF2JAozGxsjBL0f-dPXLNLx',
    });
    await Question.create({
      questionID: 380227,
      examID: 550884,
      questionText: 'What will the woman do in Houston?',
      option1: 'A Play',
      option2: 'A dance performance',
      option3: 'A film',
      option4: 'A concert',
      attach: '1CcZ87tvFDj5B2v6nVsEj9gIPf4crPqfb',
    });

    await Question.create({
      questionID: 500949,
      examID: 550884,
      questionText: 'Where does the man need to go at three o’clock?',
      option1: 'To the bus stop',
      option2: 'To the train station',
      option3: 'To the auto shop',
      option4: 'To the dentist’s office',
      attach: '1NsEEqmHBwjuc8EjG9ybqTSk64aqapwww',
    });

    await Answer.create({
      answerID: 29056,
      questionID: 30044,
      examID: 270481,
      correctAnswer: 'D',
    });
    await Answer.create({
      answerID: 89293,
      questionID: 90068,
      examID: 270481,
      correctAnswer: 'C',
    });
    await Answer.create({
      answerID: 99142,
      questionID: 100739,
      examID: 270481,
      correctAnswer: 'D',
    });
    await Answer.create({
      answerID: 230223,
      questionID: 230688,
      examID: 270481,
      correctAnswer: 'B',
    });
    await Answer.create({
      answerID: 299619,
      questionID: 300268,
      examID: 270481,
      correctAnswer: 'A',
    });
    await Answer.create({
      answerID: 309227,
      questionID: 310378,
      examID: 550884,
      correctAnswer: 'C',
    });
    await Answer.create({
      answerID: 379517,
      questionID: 380227,
      examID: 550884,
      correctAnswer: 'C',
    });
    await Answer.create({
      answerID: 409551,
      questionID: 410419,
      examID: 270481,
      correctAnswer: 'B',
    });
    await Answer.create({
      answerID: 499334,
      questionID: 500949,
      examID: 550884,
      correctAnswer: 'D',
    });
  


    

    console.log('Admin user created successfully!');
  } else {
    console.log('Admin user already exists.');
  }
}


