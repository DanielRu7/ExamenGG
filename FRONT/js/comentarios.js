

function llamada(){
  fetch("http://localhost:3000/api/comentarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      nombre: document.getElementById("contact-name").value,
      correo: document.getElementById("contact-email").value,
      asunto: document.getElementById("contact-subject").value,
      mensaje: document.getElementById("contact-message").value
    })
  })
  .then(res => res.json())
  .then(data => {
    Swal.fire({
      title: "¡Datos enviados!",
      text: "Operación completada",
      icon: "success"
    }).then(() => location.reload());
  })
  .catch(err => {
    Swal.fire({
      title: "Error",
      text: "No autorizado o error al enviar datos",
      icon: "error"
    });
  });
}




document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  llamada();


});




    

