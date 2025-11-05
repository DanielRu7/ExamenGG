async function mandarNombre(){
    const nombre = localStorage.getItem("userName");

    const res =await fetch("http://localhost:3000/api/certificado", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ user: nombre })
  });
  
  const blob = await res.blob();


        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'certificado.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
  
} 

mandarNombre();