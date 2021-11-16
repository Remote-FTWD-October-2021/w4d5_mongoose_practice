window.onload = () => {
  const createStudentButton = document.getElementById("create-student-button");

  //Event listener del botón para crear un nuevo alumno
  if (createStudentButton) {
    createStudentButton.addEventListener("click", async () => {
      const name = document.getElementById("name").value;
      const lastName = document.getElementById("lastName").value;
      const age = document.getElementById("age").value;
      const classroom = document.getElementById("class").value;
      const idioma = document.getElementById("idioma").value;

      const allInputs = { name, lastName, age, class: classroom, idioma };

      await axios({
        method: "POST",
        url: "/new-student",
        data: allInputs,
      });
      window.location.assign("/all-students");
    });
  }

  //Event listener para eliminar un usuario
  const deleteStudentButton = document.getElementById("delete-student");
  const editStudentButton = document.getElementById("edit-student");
  if (deleteStudentButton && editStudentButton) {
    deleteStudentButton.addEventListener("click", async () => {
      const studentId = deleteStudentButton.getAttribute("data");
      await axios({
        method: "DELETE",
        url: `/student/${studentId}`,
      });
      window.location.assign("/all-students");
    });

    editStudentButton.addEventListener("click", async () => {
      const studentId = editStudentButton.getAttribute("data");
      const classroom = document.getElementById("class-edit").value;
      const pendingBills = document.getElementById("pendingBills-edit").value;
      await axios({
        method: "PUT",
        url: `/edit-student/${studentId}`,
        data: {class: classroom, pendingBills}
      })
      window.location.assign(`/student/${studentId}`)
    });
  }
};
