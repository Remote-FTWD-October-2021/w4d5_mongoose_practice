
const mongoose = require('mongoose')
const chalk = require('chalk')
const DB = 'mongoose-example'

//Models
const Student = require('./models/Student.js')

//Connect to MongoDB
const connectToMongo = async()=>{
  try {

   await mongoose.connect(`mongodb://localhost:27017/${DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    
    console.log(chalk.bgBlue('Conectado a Mongo'))

  } catch(err){
    console.log('Error:', err)
  }
}

connectToMongo()


//1. CREATE --> Crear un nuevo documento. Para esto, tenemos que aplicar el metodo .create() sobre el modelo en el que queremos crear el documento.
const createStudent = async()=>{
  try{
    const student = await Student.create({
      name: 'Jimena',
      lastName: 'Miranda',
      age: 7,
      grades: [8, 8, 8, 8, 9, 9, 10],
      class: 'A',
      pendingBills: false
    })
    console.log(student)
  }catch(err){
    console.log('ERROR: ', err)
  }
}

// createStudent()

//2. READ:
//2.1. .find(filter, project, resto de opciones) --> Este metodo nos sirve para buscar todos los documentos sobre un modelo determinado que cumplan a condición que le pasamos por el filter (primer argumento)
const findStudent = async ()=>{
  try{
    const students = await Student.find({age: 10}, {name: 1, lastName: 1}, {sort: {lastName: 1}, limit: 20}) //Encuentra a todos los alumnos que tengan 10 años, y devuelve solo el nombre y apellido (y el _id que ya viene por defecto) de los primeros 20 alumnos (ordenados por orden alfabético según su apellido)
    console.log(students)
  }catch(err){
    console.log(err)
  }
}

// findStudent()

//2.2. .findById(id) --> Este metodo te permite buscar un documento por su _id
const findStudentById = async (id)=>{
  try{
    const student = await Student.findById(id) //Encuentra al alumno que tenga el id asociado que le hemos pasado como argumento
    console.log(student)
  }catch(err){
    console.log('ERROR: ', err)
  }
  
}
// findStudentById("618e3d520009f850d2654a76")


//3. UPDATE

//3.1 .findOneAndUpdate(<target>, <elementos que quiero cambiar>, {new: true}) --> Este metodo nos va a buscar un documento (target) y lo va a editar según los elementos que hayamos pasado en el segundo argumento (dentro de un objeto literal)

const updateStudent = async ()=>{
  try{
    const student = await Student.findOneAndUpdate(
      {name: 'Jaime'}, 
      {"grades.0": 100}, //Para acceder a un array dentro de Mongo, hay que hacerlo con un . y poner todo el query entre comillas
      {new: true} //Esto hay que ponerlo para ver el documenot después de haber sido actualizado. Si no ponemos esto, vamos a ver el documento antes de haber sido actualizado.
    ) // Encuentra al primer alumno que se llame Jaime y cambia su primera nota (grades) a 100
    console.log(student)  
  }catch(err){
    console.log('error: ', err)
  }
}

// updateStudent()

//3.2. updateMany(<target>, <elementos que quiero cambiar>) --> Actualiza uno o mas elementos que cumplan los requisitos que le pongas en el target

const updateSomeStudents = async ()=>{
  try{
    const response = await Student.updateMany({idioma: {$exists: false}}, {idioma: "NA"}) //Añade el campo de idioma a todos los alumnos que no tuvieran el campo de idioma (y ponles el valor de NA)
    console.log(response)
  }catch(err){
    console.log("ERROR: ", err)
  }
}

// updateSomeStudents()


//3.3 findByIdAndUpdate(id, <elementos a actualizar>, {new: true}) --> Este método funciona solo con _id. Te busca el documento que tenga ese _id único y lo actualiza con las propiedades que hayas definido en el objeto literal del segundo argumento.

const updateStudentById = async (id)=>{
  try{
    const updatedStudent = await Student.findByIdAndUpdate(id, {age: 5}, {new: true}) //Encuentra al alunno que tenga el id que le hemos pasado a la función como argumento y actualiza su edad a 5
    console.log(updatedStudent)
  }catch(err){
    console.log(err)
  }
}

// updateStudentById("618e3d520009f850d2654a76")

//4. DELETE

// 4.1 .findOneAndDelete()

const deleteOneStudent = async ()=>{
  try{
    const response = await Student.findOneAndDelete({name: "Andrea"}) //Elimina al primer alumnoq que encuentres que se llame Andrea
    console.log(response)
  }catch(err){
    console.log(err)
  }
}

// deleteOneStudent()


// 4.2 .deleteMany()
const deleteManyStudents = async ()=>{
  try{
    const response = await Student.deleteMany({name: "Andrea"}) //Elimina a todos los alumnos que se llaman Andrea
    console.log(response)
  }catch(err){
    console.log(err)
  }
}

// deleteManyStudents()


// 4.3 .findByIdAndDelete()

const deleteStudentById = async (id)=>{
  try{
    const deletedStudent = await Student.findByIdAndDelete(id, {new: true})
    console.log(deletedStudent)
  }catch(err){
    console.log(err)
  }
}

// deleteStudentById("618e42f5061995ffab4f2a31")