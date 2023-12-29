const { google } = require("googleapis");
const multer = require('multer')
const fs = require('fs')


// lấy file audio và trả về dữ liệu
const getAudio = async (req, res) => {
   // lấy file audio cần đọc
  const fileID = req.params.fileID;

  try {
     // thực hiện xác thực bằng google auth
    const auth = new google.auth.GoogleAuth({
      keyFile: "./googlekey.json",
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });
    // tạo drive để thực hiện tương tác
    const driveService = google.drive({
      version: "v3",
      auth: await auth.getClient(),
    });

    // thực hiện gửi file và đợi kết quả trở về 
    const response = await driveService.files.get(
      { fileId: fileID, alt: 'media' },
      { responseType: 'stream' }
    );

     // Pipe dữ liệu trả về cho Express response
    response.data.pipe(res);
  } catch (error) {
     // trả về status 500 nối không thực hiện được kết nối đến google api
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error huhu' });
  }
};
 // id của thư mục trong google drive dùng để lưu 
const GOOGLE_API_FOLDER_ID = '1A-Rk4Aq7VlLDZJ9mLegd45bcGvLa9a0W';
// địa điểm lưu file
const upload = multer({ dest: 'uploads/' });

const uploadAudio = async(req,res)=>{
  try {
    // thực hiện xác thực bằng google auth
    const auth = new google.auth.GoogleAuth({
      keyFile: './googlekey.json',
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
     // tạo drive để thực hiện tương tác
    const driveService = google.drive({
      version: 'v3',
      auth,
    });

     // Multer middleware xử lý upload file
    upload.single('audioFile')(req, res, async (err) => {
      if (err) {
        console.error('Multer error', err);
        return res.status(500).send('Multer Error');
      }
     
      try {
         // xác định metadata
        const fileMetaData = {
          name: req.file.originalname,
          parents: [GOOGLE_API_FOLDER_ID],
        };
          // xác định dữ liệu
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

         // xóa liên kết với file upload
        fs.unlinkSync(req.file.path);
         // trả kết quả 200
        res.status(200).json({ fileId: response.data.id });
      } catch (error) {
        // trả kết quả 500 nếu không thể tạo kết nối và gửi file lên drive
        console.error('Upload file error', error);
        res.status(500).send('Internal Server Error');
      }
    });
  } catch (error) {
    // trả kết quả 500 nếu thông thể xác thực google
    console.error('Auth error', error);
    res.status(500).send('Auth Error');
  }
}
// hàm xóa file audio
const deleteAudio = async(req,res) =>{
  try{
    // lấy id file càn xóa
    const fileId = req.params.fileId
    // nếu trường id không tồn tại tả về kết quả 400
    if (!fileId) {
      return res.status(400).json({ error: 'Missing fileId in request body' });
    }
     // xác thực google auth
    const auth = new google.auth.GoogleAuth({
      keyFile: './googlekey.json',
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
    // tạo kết nối đến google drive
    const driveService = google.drive({
      version: 'v3',
      auth,
    });

    // xóa file bằng id
    await driveService.files.delete({
      fileId: fileId,
    });
    // trả kết quả 200 trở về
    res.status(200).json({ message: `File with ID ${fileId} deleted successfully.` });
  }catch(error){
    console.error('API error', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// xác định nơi chứa key của google 
const API_KEY_PATH = "./googlekey.json";
// lấy dữ liệu trong drive
const getDriveData = async (req, res) => {
  try {
    const fileId = req.params.fileId;
     // xác thực thông qua google auth
    const auth = new google.auth.GoogleAuth({
      keyFile: API_KEY_PATH,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const driveService = google.drive({
      version: "v3",
      auth,
    });
    // nhận kết quả trả về
    const response = await driveService.files.get({
      fileId,
      fields: "id, name, mimeType",
    });
    // lưu dữ liệu trả về vào biến file
    const file = response.data;
    // parse sang dạng json
    res.json({ file });
  } catch (error) {
    // nếu không thể tạo kết nối trả về 500
    console.error("Error retrieving data from Google Drive", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAudio, getDriveData,uploadAudio,deleteAudio};
