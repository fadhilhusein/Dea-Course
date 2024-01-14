// !Setup File Database Connection | standar format

const mysql = require('mysql')
const env = require('dotenv')
const util = require("util") // 👈 bawaan node js untuk kebutuhan penggunaan asynchronous

env.config()

// konfigurasi database credentials | nilainya dari file .env 👇
const connection = mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.query = util.promisify(connection.query).bind(connection) // 👈 supaya query bisa berjalan secara asynchronous

// validasi untuk logging koneksi database 👇
connection.connect((err) => {
    if(err) {
        console.log('err');
    }
    console.log('connected to database, ready to use!')
})

module.exports = connection // 👈 supaya query bisa di akses diluar file ini