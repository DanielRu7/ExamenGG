function agregarEvento() {
    const noActiva = document.getElementsByClassName("noActiva");
    Array.from(noActiva).forEach(boton => {
        boton.addEventListener("click", (e) => {
            e.preventDefault();
            const logeado = localStorage.getItem("userName");
            if(logeado!=null){
                Swal.fire({
                title: "No Disponible aun",
                text: "Proximamente...",
                icon: "error"
                });
            }else{
                Swal.fire({
                title: "Nesesitas tener cuenta, estar logeado",
                text: "iniciarse!!!",
                icon: "error"
                });
            }
            
        });
    });
    document.getElementById("pago").addEventListener("click",async(e)=>{
        e.preventDefault();
        const logeado = localStorage.getItem("userName");
        if(logeado==null){
            Swal.fire({
                title: "Nesesitas tener cuenta, estar logeado",
                text: "iniciarse!!!",
                icon: "error"
                });
            return;
        }


        const estado = await buscar();
        if(!estado||estado==null){
            window.location.href="pago.html";

        }else{
            Swal.fire({
                title: "Pago ya Realizado",
                text: "no pages mas!",
                icon: "error"
            });
        }

    });


    document.getElementById("examen").addEventListener("click",async(e)=>{
        e.preventDefault();
        const logeado = localStorage.getItem("userName");
        if(logeado==null){
            Swal.fire({
                title: "Nesesitas tener cuenta, estar logeado",
                text: "iniciarse!!!",
                icon: "error"
                });
            return;
        }

        const estado = await buscar();
        const examen = await buscarExamen();
        if(estado && (!examen || examen==null)){

            Swal.fire({
                title: "Estas seguro?",
                text: "Solo puedes realizar el examen una sola vez",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, iniciar!"
                }).then(async(result) => {
                if (result.isConfirmed) {
                    window.location.href="examen.html";
                    /////////////////////////////texto o algo para el examen 
                    await agregarExamen();


                }
                });
        }else{
            if(!estado || estado==null){
                Swal.fire({
                title: "Primero Realice el Pago",
                text: "",
                icon: "error"
            });
            }else{
                Swal.fire({
                title: "Examen ya realizado, solo un intento Permitido!!!!",
                text: "",
                icon: "error"
            });   
            }
            
        }
        
        
        
    });
}

async function buscar() {
  const nombre = localStorage.getItem("userName"); // <-- ya no JSON.parse

  const res = await fetch("http://localhost:3000/api/getpago", {
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

async function agregarExamen() {
  const nombre = localStorage.getItem("userName"); 
  await fetch("http://localhost:3000/api/getexamen", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ user: nombre }) 
  });
}


async function buscarExamen() {
  const nombre = localStorage.getItem("userName"); 
  const res = await fetch("http://localhost:3000/api/setexamen", {
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






agregarEvento();