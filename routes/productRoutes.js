const express = require("express")

const router = express.Router()

const {cacheMiddleware} = require("../middleware/cacheMiddleware.js")
const { getProductById,getProducts,createProduct} = require("../controllers/productController.js")

router.get('/products',cacheMiddleware,getProducts)

router.get('/products/:id',cacheMiddleware,getProductById)
router.post('/products',createProduct)

module.exports=router