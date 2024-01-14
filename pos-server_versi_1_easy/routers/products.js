//!products.js in routers folder

const express = require('express')
const products = express.Router()
const { getProducts, createProduct } = require("../controllers/products")

// wajib pake async await karena di dalem function nya mengandung promise
// jalur utama untuk resource endpoint products api

// api untuk get semua list product, url: http://localhost:3000/products | method GET 👇
products.route('/').get(async (req, res) => {
    res.send(await getProducts())
})

// api untuk membuat dummy product, url: http://localhost:3000/products | method POST 👇
products.route('/').post(async (req, res) => {
    const { name, price, stock } = req.body // 👈 data yang dikirim dari client atau frontend
    
    // tampung jadi 1 object
    const data = {
        name, price, stock
    }

    // response untuk client 👇
    res.send(await createProduct(data))
})

module.exports = products