const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
app.listen(5000,()=>{
  console.log('Listening on',5000)
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
async function mongooseConnect(){
  try{
    await mongoose.connect('mongodb+srv://user1:otBPTi5iCf3VAyLj@cluster0.cpoyx.mongodb.net/phoneNumbersCollection?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true,autoIndex:true})
    console.log('Successfully connected')
  }catch(e){
    console.log(e)
  }
}
mongooseConnect()
const ContactSchema = new Schema({
  firstName:{
    type:String,
    lowercase:true,
    unique:true,
    index:true
  },
  lastName:{
    type:String,
    lowercase:true
  },
  phoneNumber:{
    type:Number,
    unique:true,
    required:true
  }
})

const Contact = mongoose.model('contact',ContactSchema)

// Contact.on('index', function(err) { 

//   if (err) {
//     console.log("Could not create index: ", err)
//   } else {
//     console.log("Index created")
//   }

// });



app.get('/',cors(), async (req,res)=>{
  try{
    const contacts = await Contact.find({}).sort({lastName:'asc'})
    res.status(200).send(contacts)
  }catch(e){
    res.status(404).send('Hubo un problema')
  }
})

app.post('/newContact', cors(),async (req,res)=>{
  try{
    const contact = new Contact(req.body)
    await contact.save()
    res.status(201).end()
  }catch(e){
    res.status(409).send(e)
  }
})

app.put('/modifyEntry',cors(), async (req,res)=>{
  try{
    console.log(req.body)
    const {newFirstName,newLastName,newPhoneNumber} = req.body.newValues
    console.log(req.body.oldValues)
    await Contact.findOneAndUpdate(req.body.oldValues,{firstName:newFirstName,lastName:newLastName,phoneNumber:newPhoneNumber})
    res.status(201).send()
  }catch(e){
    console.log(e)
    res.status(404).send(e)
  }
})

app.delete('/removeEntry',cors(),async (req,res)=>{
    try{
      console.log('received')
      await Contact.findOneAndDelete(req.body)
      res.status(202).send()
    }catch(e){
        console.log(e)
        res.status(204).send()
    }
})
