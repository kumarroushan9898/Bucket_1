const productService = require("../services/productService.js")
const {cache,clearCache} = require("../middleware/cacheMiddleware.js")

const getProducts = async (req,res) => {
    try {
        let key=req.url
        let products = await productService.getProducts()
        cache[key]={
            "value":products,
            "createdAt" : Date.now()
        }
        res.json(products)
    } catch (error) {
        console.log(error)

        res.status(500).json({message: "Something went wrong"})
    }
}


const getProductById = async (req, res) => {
    try {
        let key = req.url
        let id = Number(req.params.id)
        const product = await productService.getProductById(id)

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        cache[key]={
            "value":product,
            "createdAt" : Date.now()
        }
        res.status(200).json(product)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}
const createProduct = async (req,res)=>{
    try{
        let product = req.body;
        let newProduct = await productService.createProduct(product)
        clearCache()
        res.status(201).json(newProduct)
    }catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}


module.exports = { 
    getProducts,
    getProductById,
    createProduct
}
