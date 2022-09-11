const express = require("express")
const router = express.Router()
const {people} = require('../data')


router.get("/",(req,res)=>{
    res.status(200).json({success:true,data:people})
})

router.post("/",(req,res)=>{
    const {name } = req.body
    !name?res.status(400).json({success:false,msg:"pls provide the credentials"}):res.status(201).json({success:true})
    
})

router.put("/:id",(req,res)=>{
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

router.delete('/:id',(req,res)=>{
     const person = people.find((person)=> person.id === Number(req.params.id))
     if(!person){
        return res.status(404).json({success:false,msg:`no person with id ${req.params.id}`})
     }
     const newPerson = people.filter((person)=> person.id !== Number(req.params.id))
     return res.status(200).json({success:true,data:newPerson})
})


module.exports = router