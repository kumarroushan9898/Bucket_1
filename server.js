const express =require("express")
const productRoutes = require("./routes/productRoutes.js")
const app=express();
app.use(express.json())
app.use(productRoutes)

app.listen(3000,()=>{
    console.log("server is running")
})



