const server = require('express')
const app = server()


const logger = (req,res,next) =>{
    const method = req.method
    const url = req.url
    const time = new Date().getTime()
    console.log(method,url,time)
    next()
}
app.get("/",logger,(req,res)=>{
    res.send("Home")
})
app.get("/about",logger,(req,res)=>{
    res.status(200).send("about")
})

app.get("*",(req,res)=>{
    res.status(404).send("Page Not Found")
})
app.listen(5000,console.log("server is running"))