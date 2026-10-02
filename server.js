const fs = require("fs/promises")
const path = require("path")
const express =require("express")
const pathToFile=path.join(__dirname,"./database/db.json")

const app=express();
let cache = {}
const CACHE_TTL = 60 * 1000;

async function readData (){
    let data =await fs.readFile(pathToFile,"utf8")
    return JSON.parse(data)
}

app.get('/products', async (req,res)=>{
    try{
        let key=req.url
        let cacheData = cache[key]
        if (cacheData){
            let age = Date.now() - cacheData.createdAt
            if (age < CACHE_TTL){
                res.set("X-Cache", "HIT")
                return res.json(cacheData.value)
            }
            delete cache[key]   
        }
        res.set("X-Cache", "MISS")
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

app.get('/products/:id', async (req,res)=>{
    try{
        let key=req.url
        let cacheData = cache[key]
        if (cacheData){
            let age = Date.now() - cacheData.createdAt
            if (age < CACHE_TTL){
                res.set("X-Cache", "HIT")
                return res.json(cacheData.value)
            }
            delete cache[key]   
        }
        res.set("X-Cache", "MISS")
        let products =await dealyReadData()
        let id=Number(req.params.id)
        const product=products.find(item => item.id==id)
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



