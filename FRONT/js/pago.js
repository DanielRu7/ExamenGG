async function inicio() {
  const form = document.querySelector(".seccion");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    
    const estado = await buscar();

    console.log(estado);
    if (!estado || estado === null) {
      

      await agregar();

      Swal.fire({
        title: "Pago realizado con éxito",
        text: "!!!!!",
        icon: "success"
      }).then(() => {
        window.location.href="certificaciones.html";
      });
    } else {
      Swal.fire({
        title: "Pago ya realizado",
        text: "no pages más!",
        icon: "error"
      }).then(() => {
        location.reload();
      });
    }
  });
}


async function agregar() {
  const nombre = localStorage.getItem("userName"); // <-- ya no JSON.parse

  await fetch("http://localhost:3000/api/pago", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ user: nombre }) // enviamos solo el string
  });
}

async function buscar() {
  const nombre = localStorage.getItem("userName"); // <-- ya no JSON.parse

  const res = await fetch("http://10.13.140.119:3000/api/getpago", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ user: nombre })
  });

  const data = await res.json();
  return data.encontrado;
}






inicio();