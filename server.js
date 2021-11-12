
//Dependencies from npm
const express  = require('express')
const chalk    = require('chalk')
const mongoose = require('mongoose')

//Own Variabeles
const app  = express()
const PORT = 3000
const DB   = 'mongoose-example'

//Models
const Student = require('./models/Student.js')

//Connection to Database
const connectToMongo = async()=>{
  try {

   await mongoose.connect(`mongodb+srv://<usuario>:<contraseña>@cluster0.7osla.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    
    console.log(chalk.bgBlue('Conectado a Mongo'))

  } catch(err){
    console.log('Error:', err)
  }
}

connectToMongo()

//Middleware for the view engine
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

//Routes

app.get('/', (req, res)=>{
  res.render('home.hbs')
})

app.get('/all-students', async (req, res)=>{
  // codigo
  const allStudents = await Student.find({}, {name: 1, lastName: 1})

  res.render('allStudents.hbs', {allStudents})
})

app.get('/student/:id', async (req, res)=>{

  const studentInfoFromDatabase = await Student.findById(
    req.params.id,
    {name: 1, lastName: 1, age: 1, class: 1, idioma: 1}
  )
  
  res.render('student.hbs', studentInfoFromDatabase)
})


//Server listener
app.listen(PORT, ()=>{
  console.log(chalk.bgGreen(`Server open at PORT ${PORT}`))
})