module.exports = {
    HOST:'localhost',  // hostname hoặc địa chỉ ip cho Mysql server
    USER: 'root',      // username cho kết nối đến Mysql
    PASSWORD: '',      // password cho kết nốt đến Mysql 
    DB: 'test',        // tên database được kết nối đến
    dialect: 'mysql',  // loại sql database sử dụng
    pool: {
        max:5,          // lượng kết nối tối đa
        min:0,          // lượng kết nối tối thiểu
        acquire:30000,  // thời gian để tạo kết nối tối đa đến pool (miliseconds)
        idle: 10000     // thời gian giữ kết nối tối đa đến pool (miliseconds)
    } 
}