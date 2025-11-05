// --- Manejo del modal de login y logout ---
export const iniciarLoginLogout=function(){
  ////////////////////7

  // Verificar si hay sesión activa al cargar la página
  checkSession();

  // Abrir/cerrar modal de login
  document.getElementById('loginBtn').onclick = () => {
    document.getElementById('loginModal').style.display = 'block';
  };
  
  document.getElementById('closeModal').onclick = () => {
    document.getElementById('loginModal').style.display = 'none';
  };
  
  window.onclick = (e) => {
    if (e.target === document.getElementById('loginModal')) {
      document.getElementById('loginModal').style.display = 'none';
    }
  };

  // Manejar logout
  document.getElementById('logoutBtn').onclick = logout;


// Capturamos el formulario
const form = document.getElementById("formLogin");

// Escuchamos el evento "submit"
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // evita que la página se recargue

  // Obtener los valores escritos por el usuario
  const login = document.getElementById("login").value;
  const contrasena = document.getElementById("password").value;

  // Enviar los datos al servidor usando fetch + async/await
  try {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cuenta: login, contrasena: contrasena })
    });


    // Intentamos parsear el JSON (puede fallar si el servidor responde vacío)
    let data;
    try {
      data = await res.json();
    } catch (parseErr) {
      console.warn("Respuesta no JSON del servidor", parseErr);
      data = {};
    }

    // Revisar la respuesta
    if (res.ok) {
      const cuenta = data.usuario?.cuenta;
      const token = data.token;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userName', cuenta);
      
      Swal.fire({
        title: '¡Bienvenido ' + cuenta + '!',
        text: 'Has iniciado sesión correctamente.',
        icon: 'success',
        confirmButtonText: 'Continuar'
      });

      updateUILoggedIn(cuenta);
      
      document.getElementById('loginModal').style.display = 'none';
      document.getElementById("login").value = "";
      document.getElementById("password").value = "";
    } else {
      Swal.fire({
        title: 'Error',
        text: data?.error ?? `Error ${res.status}`,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      document.getElementById("login").value = "";
      document.getElementById("password").value = "";
    }

  } catch (err) {
    console.error("Error al conectar con el servidor:", err);
    Swal.fire({
      title: 'Error de conexión',
      text: 'No se pudo conectar con el servidor.',
      icon: 'error',
      confirmButtonText: 'Ok'
    });

  }
});

// --- Función para verificar si hay sesión activa ---
function checkSession() {
  const userName = localStorage.getItem('userName');
  if (userName) {
    updateUILoggedIn(userName);
  } else {
    updateUILoggedOut();
  }
}

// --- Actualizar UI cuando hay sesión ---
function updateUILoggedIn(userName) {
  let estado = JSON.parse(localStorage.getItem("estado"));
  if(estado || estado ==null){
    document.getElementById('userName').style.visibility="visible";
  }else{
    document.getElementById('userName').style.visibility="hidden";
  }
   document.getElementById('userName').textContent = `Te apreciamos ${userName}`;
  document.getElementById('loginBtn').style.display = 'none';
  document.getElementById('logoutBtn').style.display = 'inline-block';
  document.getElementById('botonOculto').style.display= "block";
}


// --- Actualizar UI cuando NO hay sesión ---
function updateUILoggedOut() {
  document.getElementById('userName').textContent = '';
  document.getElementById('loginBtn').style.display = 'inline-block';
  

  
}

// --- Función para hacer logout ---
async function logout() {
  try {
    const res = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    });
    Swal.fire({
      title: "secion cerrada!",
      icon: "success",
      draggable: true
    }).then(()=>{
      window.location.href="index.html";
    });

    

    

  } catch (err) {
    console.error("Error al conectar con el servidor:", err);
    Swal.fire({
      title: 'Error de conexión ',
      text: 'No se pudo conectar con el servidor.',
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  } finally {
    // Siempre limpiar localStorage y actualizar UI, incluso si hay error
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    updateUILoggedOut();
  }
}
function requestCertificate(curso) {
    const userName = document.getElementById("userName").innerText;

    /*if (!userName) {
        alert("Debes iniciar sesión para acceder al examen y obtener el certificado");
        return;
    }*/

    // Guardar el curso elegido y redirigir al examen
    sessionStorage.setItem("cursoSeleccionado", curso);
    window.location.href = "examen.html"; // página donde estará el examen
}

function buscar(){
    const url= window.location.pathname;
    console.log(url);
    const lis=document.getElementsByTagName('a');
    if(url.includes("index.html")){
        selec(1,lis);        
        return;
    }
    if(url.includes("certificaciones.html")){
        selec(2,lis);
        return;
    }
    if(url.includes("nosotros.html")){
        selec(3,lis);
        console.log("que onda");
        return;
    }
    if(url.includes("contacto")){
        selec(4,lis);
        return;
    }


    
}

function selec(num, lis){
    for(let i = 0; i < lis.length; i++){
        lis[i].classList.toggle("activo", i === num);
    }
}


document.getElementById("botonOculto").onclick=()=>{
  let estado = JSON.parse(localStorage.getItem("estado"));
  if(estado|| estado==null){
    localStorage.setItem('estado',false);
  }else{
    localStorage.setItem('estado',true);
  }
  
  location.reload();
};





buscar();
};
