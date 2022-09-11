const express = require("express")
const router = express.Router()

router.post('/login',(req,res)=>{
    const {name} = req.body
    // console.log(req.body.name)
    name?res.status(200).send(`welcone ${name}`):res.status(401).send(`please provide correct credentials`)
})

module.exports = router