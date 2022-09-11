 const server = require('express')
const app = server()
const {logger} = require('./logger')
const authorize = require('./authorize')
const {people} = require('./data')

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

app.get("/",(req,res)=>{
    res.send("hello")
})
app.get("/about",logger,(req,res)=>{
    res.status(200).send("about")
})
app.post('/login',(req,res)=>{
    const {name} = req.body
    // console.log(req.body.name)
    name?res.status(200).send(`welcone ${name}`):res.status(401).send(`please provide correct credentials`)
})

app.get("/api/people",(req,res)=>{
    res.status(200).json({success:true,data:people})
})

app.post("/api/people",(req,res)=>{
    const {name } = req.body
    !name?res.status(400).json({success:false,msg:"pls provide the credentials"}):res.status(201).json({success:true})
    
})

app.post("api/people/:id",(req,res)=>{
    const {id } = req.params
    const {name} = req.body
    const person = people.find((person)=> person.id === Number(id))

    if(!person){
        return res.status(404).json({success:false,msg:`no person with id ${id}`})
    }
    const newPeople = people.map((person)=>{
         if(person.id=== Number(id)){
            person.name = name 
         }
         return person
    })
    res.status(200).json({success:true,data:newPeople})
})

app.delete('/api/people/:id',(req,res)=>{
     const person = people.find((person)=> person.id === Number(req.params.id))
     if(!person){
        return res.status(404).json({success:false,msg:`no person with id ${req.params.id}`})
     }
     const newPerson = people.filter((person)=> person.id !== Number(req.params.id))
     return res.status(200).json({success:true,data:newPerson})
})
app.get("*",(req,res)=>{
    res.status(404).send("Page Not Found")
})
app.listen(5000,console.log("server is running"))