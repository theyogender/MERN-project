const mongose=require('mongoose')
const Schema=new mongose.Schema({
    Name:String,
   Number:Number,
   Password:String,
   
   
})
module.exports=mongose.model('Users',Schema);