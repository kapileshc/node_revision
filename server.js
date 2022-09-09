const server = require('express')
const app = server()

app.get("/",(req,res)=>{
    res.send("Home")
})
app.get("/about",(req,res)=>{
    res.status(200).send("about")
})

app.get("*",(req,res)=>{
    res.status(404).send("Page Not Found")
})
app.listen(5000,console.log("server is running"))