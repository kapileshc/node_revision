const authorize = (req,res,next)=>{
    const {user}  = req.query
    if(user === 'john'){
        req.user = {name:'john',id:2 }
        next()
    }else{
        res.status(401).send("unauthorized")
    }
    console.log("i am authorize the person")
    next()
}


module.exports =  authorize