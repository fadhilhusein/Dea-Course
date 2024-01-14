//! router transaction

const express = require("express")
const transactions = express.Router()

const { randomOrderNumber } = require("../helpers/utils")
const { checkout } = require("../controllers/transactions")

// jalur utama untuk akses resource endpoint transaction API 👇
transactions.route('/').post(async(req, res) => {
    const { total_price, paid_amount, products } = req.body //👈 data yg dikirim client 
    
    //wrap jadi 1 object
    const order = {
        no_order: randomOrderNumber(), 
        total_price, 
        paid_amount
    }

    // kirim balik response untuk client
    res.send("ywy")
})

module.exports = transactions