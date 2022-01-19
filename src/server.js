const app = require('express')();

app.listen(3000,()=>{
  console.log('Listening on',3000)
})

app.get('/',()=>{
  res.send('Hi there')
})
