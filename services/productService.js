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
    let { name, price } = product
    let newProduct = { id: products.length + 1, name, price}
    products.push(newProduct)
    await writeProduct(products)
    return newProduct
}
async function updateProduct(id,updateProduct){
    let products= await readData()
    let index=products.findIndex( item => item.id==id)

    if (index==-1){
        return null
    }
    products[index]={
        ...products[index],...updateProduct,id
    }

    await writeProduct(products)

    return products[index]
}
async function patchProduct(id,updateProduct){
    let products= await readData()
    let index=products.findIndex( item => item.id==id)

    if (index==-1){
        return null
    }
    products[index]={
        ...products[index],...updateProduct,id
    }

    await writeProduct(products)

    return products[index]
}

async function deleteProduct(id) {
    let products = await readData()
    let index = products.findIndex(item => item.id == id)
    if (index === -1) {
        return null
    }
    let deletedProduct = products[index]
    products.splice(index, 1)
    await writeProduct(products)
    return deletedProduct
}

module.exports={
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
}