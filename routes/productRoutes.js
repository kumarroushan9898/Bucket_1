const express = require("express")

const router = express.Router()

const {cacheMiddleware} = require("../middleware/cacheMiddleware.js")
const { getProductById,getProducts} = require("../controllers/productController.js")

router.get('/products',cacheMiddleware,getProducts)

router.get('/products/:id',cacheMiddleware,getProductById)

module.exports=router