import { iniciarLoginLogout } from "./app.js";


async function cargar(id,archivo,call){
    try{
        const respuesta= await fetch(archivo);
        const contenido =await respuesta.text();
        document.getElementById(id).innerHTML =contenido;

        if(call){
            call();
        }
        
    }
    catch (error){
        console.log("error revisar archivos header y footer");
        console.error("error al cargar "+archivo,error);
    }
}


async function init() {
    await cargar("header", "/FRONT/html/header-footer/header.html");
    await cargar("footer", "/FRONT/html/header-footer/footer.html");
    await cargar("loginModal", "/FRONT/html/header-footer/modal.html");

    
    iniciarLoginLogout();
 
    
}




init();
