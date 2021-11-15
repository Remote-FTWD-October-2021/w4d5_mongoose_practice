
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

   await mongoose.connect(`mongodb+srv://jaime:12345@cluster0.7osla.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
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

//Middleware for the public
app.use(express.static('public'));

//Middleware for body-parser
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }))

//Routes
app.get('/', (req, res)=>{
  res.render('home.hbs')
})

app.get('/all-students', async (req, res)=>{
  console.log(req.query) //OUTPUT de la linea 70: { name: 'Jaime', otherName: 'Alejandro', status: 'alive' }
  const allStudents = await Student.find({}, {name: 1, lastName: 1})

  res.render('allStudents.hbs', {allStudents})
})

app.get('/student/:id', async (req, res)=>{

  try {
    const studentInfoFromDatabase = await Student.findById(
      req.params.id,
      {name: 1, lastName: 1, age: 1, class: 1, idioma: 1}
    )
    res.render('student.hbs', studentInfoFromDatabase)
  }catch(err){
    res.render('error.hbs', {errorMsg: "El ID proporcionado no corresponde con ningún alumno."})
  }
})

app.get('/new-student', (req, res)=>{
  res.render('newStudent.hbs')
})

app.post('/new-student',  async (req, res)=>{
  try{
    // const createdStudent = await Student.create(req.body)
    res.redirect('/all-students')
  }catch(err){
    console.log(err)
  }
})


//Server listener
app.listen(PORT, ()=>{
  console.log(chalk.bgGreen(`Server open at PORT ${PORT}`))
})


// http://localhost:3000/all-students?name=Jaime&otherName=Alejandro&status=alive