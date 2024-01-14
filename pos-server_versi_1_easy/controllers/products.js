//!products.js in controller folder
/* 
    tidak semua harus pake async await, jika tidak mengandung promise maka tidak usah pake asynchronous
    silahkan coba console log masing2 query
*/

const db = require("../configs/connection")

//function ini tidak mengandung promise 👇
exports.getProducts = () => {
     return db.query("SELECT * FROM products")
}

//function ini mengandung promise query 👇
exports.createProduct = async(data) => {
    //temporary variable 👇
    let response;

    // RAW query untuk insert product dummy 👇
    const query = await db.query("INSERT INTO products set ?", [data])

    // validasi jika database ada perubahan isi field 👇
    if(query.affectedRows > 0 ) { 
        response = "product successfuly created"
    }else {
        response = "error when inserting product"
    }

    return response
}
