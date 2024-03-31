const mongose=require('mongoose')
const Schema=new mongose.Schema({
    Name:String,
    Price:Number,
    Category:String,
   
   
})
module.exports=mongose.model('Products',Schema);