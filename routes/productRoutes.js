const express = require("express")

const router = express.Router()

const {cacheMiddleware} = require("../middleware/cacheMiddleware.js")
const { getProductById,getProducts,createProduct, patchProduct, deleteProduct,updateProduct} = require("../controllers/productController.js")

router.get('/products',cacheMiddleware,getProducts)

router.get('/products/:id',cacheMiddleware,getProductById)
router.post('/products',createProduct)
router.put('/products/:id',updateProduct)
router.patch('/products/:id',patchProduct)
router.delete('/products/:id',deleteProduct)


module.exports=router