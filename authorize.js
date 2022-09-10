const authorize = (req,res,next)=>{
    console.log("i am authorize the person")
    next()
}


module.exports =  authorize