const fs = require("fs/promises")
const path = require("path")
const express =require("express")
const pathToFile=path.join(__dirname,"./database/db.json")
const {cache,cacheMiddleware} = require("./middleware/cacheMiddleware.js")

const app=express();

async function readData (){
    let data =await fs.readFile(pathToFile,"utf8")
    return JSON.parse(data)
}

app.get('/products',cacheMiddleware, async (req,res)=>{
    try{
        let key=req.url
        let products =await dealyReadData()
        cache[key]={
            "value":products,
            "createdAt" : Date.now()
        }
        res.json(products)

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong"})
    }
    
})

app.get('/products/:id',cacheMiddleware, async (req,res)=>{
    try{
        let key=req.url
        let products =await dealyReadData()
        let id=Number(req.params.id)
        const product=products.find(item => item.id==id)
        if (!product) {
            return res.status(404).json({message: "Product not found"})
        }
        cache[key]={
            "value":product,
            "createdAt" : Date.now()
        }
        res.status(200).json(product)
        

    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Something went wrong"})
    }

})


async function dealyReadData() {
    await new Promise((resolve,reject)=>{
        setTimeout(resolve,1500)
    })

    return readData()
}


app.listen(3000,()=>{
    console.log("server is running")
})



