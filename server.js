const fs = require("fs/promises")
const path = require("path")
const express =require("express")
const pathToFile=path.join(__dirname,"db.json")

const app=express();
let cache = {}
async function readData (){
    let data =await fs.readFile(pathToFile,"utf8")
    return JSON.parse(data)
}

app.get('/products', async (req,res)=>{
    try{
        let key=req.url
        let value = cache[key]
        if (value){
            return res.json(cache[key])
        }
        let products =await dealyReadData()
        res.json(products)
        cache[key]=products

    } catch (err) {
        console.log(err)
    }
    
})

app.get('/products/:id', async (req,res)=>{
    try{
        let key =req.url
        let value =cache[key]
        if (value){
            return res.json(cache[key])
        }
        let products= await dealyReadData()
        let id=Number(req.params.id)
        const product=products.find(item => item.id==id)
        res.status(200).json(product)
        cache[key]=product

    } catch (err) {
        console.log(err)
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



