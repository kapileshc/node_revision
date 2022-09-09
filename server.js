const server = require('express')
const app = server()
const {logger} = require('./logger')


// const logger = (req,res,next) =>{
//     const method = req.method
//     const url = req.url
//     const time = new Date().getTime()
//     console.log(method,url,time)
//     next()
// }

//middleware passed as parameter manually 
// app.get("/",logger,(req,res)=>{
//     res.send("Home")
// })

// app.use function to pass middleware
app.use(logger)
app.get("/",(req,res)=>{
    res.send("home")
})
app.get("/about",logger,(req,res)=>{
    res.status(200).send("about")
})

app.get("*",(req,res)=>{
    res.status(404).send("Page Not Found")
})
app.listen(5000,console.log("server is running"))