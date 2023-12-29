const { google } = require("googleapis");
const fs = require('fs')
const db = require("../models");
const { QueryTypes } = require("sequelize");
const multer = require("multer");


const upload = multer({ dest: 'uploads/' });

const User = db.user;
const Profile = db.profile;

const GOOGLE_API_FOLDER_ID = '1A-Rk4Aq7VlLDZJ9mLegd45bcGvLa9a0W';


// chức năng upload ảnh
const uploadImage = async (req, res) => {
  try {
     // xác thực thông qua google auth
    const auth = new google.auth.GoogleAuth({
      keyFile: './googlekey.json',
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
     // tạo kết nối đến google drive
    const driveService = google.drive({
      version: 'v3',
      auth,
    });

    // Middleware Multer để xử lý tải lên tệp hình ảnh
    upload.single('imageFile')(req, res, async (err) => {
      if (err) {
        console.error('Multer error', err);
        return res.status(500).send('Multer Error');
      }

      try {
         // tạo file metadata
        const fileMetaData = {
          name: req.file.originalname,
          parents: [GOOGLE_API_FOLDER_ID],
        };
        // tạo dữ liệu thông qua request
        const media = {
          mimeType: req.file.mimetype,
          body: fs.createReadStream(req.file.path),
        };
        // tạo file trên drive
        const response = await driveService.files.create({
          resource: fileMetaData,
          media: media,
          fields: 'id',
        });

       // Xóa tệp tải lên tạm thời
        fs.unlinkSync(req.file.path);

        res.status(200).json({ fileId: response.data.id });
      } catch (error) {
        console.error('Upload image error', error);
        res.status(500).send('Internal Server Error');
      }
    });
  } catch (error) {
    console.error('Auth error', error);
    res.status(500).send('Auth Error');
  }
};
// chức năng lấy ảnh
const getImage = async (req, res) => {
  const fileID = req.params.fileID;

  try {
    // xác thực thông qua google auth
    const auth = new google.auth.GoogleAuth({
      keyFile: "./googlekey.json",
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const driveService = google.drive({
      version: "v3",
      auth: await auth.getClient(),
    });

    //Sử dụng cơ chế bất đồng bộ await để chờ yêu cầu hoàn thành
    const response = await driveService.files.get(
      { fileId: fileID, alt: 'media' },
      { responseType: 'stream' }
    );

    // Chuyển dữ liệu phản hồi sang phản hồi Express
    response.data.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// chức năng lưu ảnh
const saveImage = async(req,res)=>{
  try{
    // lấy dữ liệu qua userID và fileID
    const userID = req.params.userID;
    const fileID  = req.params.fileID;
    // thực hiện tạo query và set ảnh mới
    const query = `
      UPDATE userprofiles
      SET image = :fileID
      WHERE userID = :userID
    `;
     // lấy kết quả trả về
    const [updatedRows] = await db.sequelize.query(query, {
      replacements: {
        userID: userID,
        fileID: fileID,
      },
      type: db.sequelize.QueryTypes.UPDATE,
    });
    // kiểm tra có cập nhật ảnh mới nếu chưa trả kết quả 404 về
    if (updatedRows === 0) {
      console.log(`User with ID ${userID} does not exist.`);
      return res.status(404).send(`User with ID ${userID} does not exist.`);
    }
    // nếu thành công trả kết quả 200 về
    res.status(200).send(`User with ID ${userID} is updated`);
  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error huhu' });
  }
}
// chức năng xóa ảnh
const deleteImage = async (req, res) => {
  try {
    const fileId = req.params.fileID;
    // nếu không có trường fileid thì trả kết quả 400 về
    if (!fileId) {
      return res.status(400).json({ error: 'Missing fileId in request body' });
    }
    // xác thực thông qua google auth
    const auth = new google.auth.GoogleAuth({
      keyFile: './googlekey.json',
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    const driveService = google.drive({
      version: 'v3',
      auth,
    });

    // xóa file thông qua trường fileid
    await driveService.files.delete({
      fileId: fileId,
    });
     // trả về kết quả 200 nếu xóa được
    res.status(200).json({ message: `Image with ID ${fileId} deleted successfully.` });
  } catch (error) {
    // trả về kết quả 500 nếu gặp lỗi
    console.error('Delete image error', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// lấy id file ảnh 
const getFileID = async(req,res)=>{
  try{
    const userID = req.params.userID;
    const query = `
      SELECT image FROM userprofiles WHERE userID = :userID
    `;
    // parse dữ liệu qua dạng object
    const fileID = await db.sequelize.query(query, {
      replacements: { userID: userID },
      type: QueryTypes.SELECT,
    });
    // trả về kết quả 200 nếu tìm thấy
    res.status(200).json(fileID);
  }catch(error){
    console.error(error);
     // trả về kết quả 500 nếu gặp lỗi
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// lấy profile của user
const getProfileUser = async (req, res) => {
  try {
    // lấy id trong trường userID của request và thực hiện query thông qua id
    const userID = req.params.userID;
    const query = `SELECT profileID,userprofiles.userID,firstName,lastName,gender,phone,city,country,image, users.username,users.email FROM userprofiles 
    LEFT JOIN users ON userprofiles.userID = users.userID
    WHERE users.userID = :userID`;
    // parse dữ liệu ra object
    const profile = await db.sequelize.query(query, {
      replacements: { userID: userID },
      type: QueryTypes.SELECT,
    });
    // trả về kết quả 200 nếu tìm thấy
    res.status(200).json(profile[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// tạo profile của user
const createProfileUser = async (req, res) => {
  try {
     // lấy id trong trường userID của request và thực hiện tìm thông qua id
    const userID = req.params.userID;
    const user = await User.findByPk(userID);

    if (!user) {
      // trả về kết quả 404 nếu không tìm thấy user
      console.log(`User with ID ${userID} does not exist.`);
      return res.status(404).send(`User with ID ${userID} does not exist.`);
    }

    const profile = await Profile.create({ userID: user.userID });
    res.status(200).send(profile);
    console.log(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

//2. Chức năng edit profile
const editProfileUser = async (req, res) => {
  try {
    // lấy id trong trường userID của request và thực hiện query
    const userID = req.params.userID;
    const { firstName, lastName, phone, city, country, gender } = req.body;

    const query = `
      UPDATE userprofiles
      SET firstName = :firstName, lastName = :lastName, phone = :phone, city = :city, country = :country, gender = :gender
      WHERE userID = :userID
    `;
    // lấy dữ liệu các cột trong bảng vừa query
    const [updatedRows] = await db.sequelize.query(query, {
      replacements: {
        userID: userID,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        city: city,
        country: country,
        gender: gender,
      },
      type: db.sequelize.QueryTypes.UPDATE,
    });
    // trả về kết quả 404 nếu không tìm thấy user
    if (updatedRows === 0) {
      console.log(`User with ID ${userID} does not exist.`);
      return res.status(404).send(`User with ID ${userID} does not exist.`);
    }
    // trả về kết quả 200 nếu tìm thấy
    res.status(200).send(`User with ID ${userID} is updated`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred ", error });
  }
};
    // lấy lịch sử thông tin của profile 
  const getHistoryProfile = async(req,res)=>{
    try{
      // lấy id trong trường userID của request và thực hiện query
      const userID = req.params.userID;
      const query = `SELECT exams.title,exams.examID, exams.duration, results.score , exams.examStatus, results.turnID
      FROM exams 
      LEFT JOIN results ON exams.examID = results.examID
      WHERE results.userID = :userID`
      const history = await db.sequelize.query(query, {
        replacements: { userID: userID },
        type: QueryTypes.SELECT,
      });
      // trả về code 200 nếu lấy được kết quả
      res.status(200).json(history);
    }catch(error){
          // trả về code 500 nếu gặp lỗi
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  // lấy tổng lần làm quiz 
  const getTotalTimeTakeQuiz = async(req,res)=>{
    try{
      // lấy id trong trường userID của request và thực hiện query bằng đếm số lần làm
      const userID = req.params.userID;
      const query = `SELECT COUNT(*) AS totalTurns
      FROM exams 
      LEFT JOIN results ON exams.examID = results.examID
      WHERE results.userID = :userID;`
      // lấy dữ liệu được lưu và trả về
      const history = await db.sequelize.query(query, {
        replacements: { userID: userID },
        type: QueryTypes.SELECT,
      });
       // trả về code 200 nếu lấy được kết quả
      res.status(200).json(history[0].totalTurns);
    }catch(error){
       // trả về code 500 nếu gặp lỗi
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  


module.exports = {
  createProfileUser,
  getProfileUser,
  editProfileUser,
  uploadImage,
  saveImage,
  getImage,
  deleteImage,
  getFileID,
  getHistoryProfile,
  getTotalTimeTakeQuiz
};
