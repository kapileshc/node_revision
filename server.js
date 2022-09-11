 const server = require('express')
const app = server()
const {logger} = require('./logger')
const authorize = require('./authorize')
const people = require('./routes/people')
const login = require("./routes/auth")
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
app.use(server.static('./static-folder'))
//parsing the form data
app.use(server.urlencoded({extended: false }))
// parsing the json data
app.use(server.json())

app.use([logger])
// app.use function to pass middleware
// app.use(logger)
app.use("/login",login)
app.use("/api/people",people)

app.get("/",(req,res)=>{
    res.send("hello")
})
app.get("/about",logger,(req,res)=>{
    res.status(200).send("about")
})


app.get("*",(req,res)=>{
    res.status(404).send("Page Not Found")
})
app.listen(5000,console.log("server is running"))