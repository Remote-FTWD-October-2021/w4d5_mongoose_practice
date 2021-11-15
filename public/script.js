
 const createStudentButton = document.getElementById("create-student-button");

createStudentButton.addEventListener("click", () => {
 
  const name = document.getElementById("name").value;
  const lastName = document.getElementById("lastName").value;
  const age = document.getElementById("age").value;
  const classroom = document.getElementById("class").value;
  const idioma = document.getElementById("idioma").value;

  const allInputs = {name, lastName, age, class: classroom, idioma};

  //Ruta POST con axios
  axios({
    method: "POST",
    url: "http://localhost:3000/new-student",
    data: allInputs
  })

  //Ruta GET con axios
  // axios('http://localhost:3000/new-student')
});