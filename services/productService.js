const fs = require("fs/promises")
const path = require("path")
const pathToFile=path.join(__dirname,"../database/db.json")

async function readData (){
    let data =await fs.readFile(pathToFile,"utf8")
    return JSON.parse(data)
}

async function dealyReadData() {
    await new Promise((resolve,reject)=>{
        setTimeout(resolve,1500)
    })
    return readData()
}

async function writeProduct(products){
    await fs.writeFile(pathToFile,JSON.stringify(products,null,2))
}

async function getProducts() {
    let products= await dealyReadData()
    return products
}

async function getProductById(id) {
    let products= await dealyReadData()
    let product=products.find(item => item.id==id)
    return product
}

async function createProduct(product) {
    let products= await readData()
    products.push(product)
    await writeProduct()
    return product
}

module.exports={
    getProducts,
    getProductById,
    createProduct
}