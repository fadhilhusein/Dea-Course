//! transaction controller
const db = require("../configs/connection");

// !tidak semua harus pakai async await
exports.checkout = async (data, products) => {
    //temporary data 👇
    let dataProducts = [];
    let idProducts = [];
    let updateStock = [];

    //product dari frontend di mapping dan mengisi nilai temporary data diatas untuk kebutuhan query. 👇
    products.map((item) => {
        dataProducts.push([data.no_order, item.id, item.quantity]);
        idProducts.push([item.id]);
    });

    //check stock product yang ada di DB berdasarkan list id yang dikirim dari FE 👇
    const stockProduct = await db.query("SELECT stock FROM products where id in (?)", [idProducts]);

    //mapping untuk update temporary variable yang bernama updateStock menjadi memiliki nilai yang isi adalah data product dari FE + stock yang sudah dikalkulasi atau dilakukan pengurangan stock. 👇
    stockProduct.map((product, i) => {
        updateStock.push([
            dataProducts[i][1],
            product.stock - dataProducts[i][2],
        ]);
    });
    
    //RAW query untuk insert data yang sudah divalidasi diatas ke table transaksi 👇
    db.query("INSERT INTO transactions set ?", [data])
    db.query("INSERT INTO transaction_detail (no_order, id_product, quantity) VALUES ?", [dataProducts]);

    //RAW query untuk update data stock product yang sudah dikalkulasi diatas ke table product 👇
    db.query("INSERT INTO products (id, stock) VALUES ? ON DUPLICATE KEY UPDATE stock = VALUES(stock)", [updateStock]);

    // munculkan hasil response ke client atau frontend 👇
    const response = db.query("SELECT no_order, total_price, paid_amount FROM transactions where no_order = ?", [data.no_order]);
    return response
};
