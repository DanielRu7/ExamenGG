const users = require("../modelo/users.json");
const { createSession, deleteSession } = require("../middleware/auth.middleware");

const PDFDocument = require('pdfkit');
  const path = require('path');


let pago=[];
let examen=[];


/**
 * Login de usuario
 */
exports.login = (req, res) => {
  const { cuenta } = req.body || {};
  const contrasena = req.body?.contrasena ?? req.body?.["contraseña"];

  
  const match = users.find(u => u.cuenta === cuenta && u.contrasena === contrasena);

  if (!match) {
    return res.status(401).json({ error: "Credenciales inválidas." });
  }

  const token = createSession(match.cuenta);

  console.log(`[LOGIN] Usuario: ${match.cuenta} | Token: ${token}`);

  return res.status(200).json({
    mensaje: "Acceso permitido",
    usuario: { cuenta: match.cuenta },
    token
  });
  
};

/**
 * Logout de usuario
 */
exports.logout = (req, res) => {
  const token = req.token;
  const userId = req.userId;

  console.log(`[LOGOUT] Usuario en sesión: ${userId} | Token: ${token}`);

  const deleted = deleteSession(token);

  if (deleted) {
    return res.status(200).json({ mensaje: "Sesión cerrada correctamente" });
  } else {
    return res.status(404).json({ error: "Sesión no encontrada" });
  }
};

/**
 * Obtener perfil del usuario autenticado
 */
exports.getProfile = (req, res) => {
  const userId = req.userId;

  const user = users.find(u => u.cuenta === userId);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  return res.status(200).json({
    usuario: { cuenta: user.cuenta }
  });
};





exports.getDatos = (req, res) => {
  
  const { nombre, correo, asunto, mensaje } = req.body;

  console.log("nombre:", nombre);
  console.log("correo:", correo);
  console.log("asunto:", asunto);
  console.log("mensaje:", mensaje);
  console.log("\n");
  res.json({ mensaje: "Datos recibidos" });
};

exports.setPago = (req, res) => {
  const user = req.body.user?.trim().toLowerCase();
  pago.push({ nombre: user });
  res.json({ success: true });
};

exports.getPago = (req, res) => {
  const user = req.body.user?.trim().toLowerCase();
  const encontrado = pago.some(p => p.nombre.toLowerCase() === user);
  res.json({ encontrado });
};


exports.getExamen = (req, res) => {
  const user = req.body.user?.trim().toLowerCase();
  examen.push({ nombre: user });
  res.json({ success: true });
};

exports.setExamen = (req, res) => {
  const user = req.body.user?.trim().toLowerCase();
  const encontrado = examen.some(p => p.nombre.toLowerCase() === user);
  res.json({ encontrado });
};


exports.certificado=(req,res)=>{
  
  console.log("Usuario recibido:", req.body.user);

  
  const { user } = req.body || {};
  const match = users.find(u => u.cuenta === user );
  console.log(match.nombre);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=certificado.pdf');
  const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 0 });
  doc.pipe(res);
  const imgPath = path.join(__dirname, 'certificado.png');

    try {

    doc.image(imgPath, 0, 0, { width: doc.page.width, height: doc.page.height });
  } catch (err) {
    console.error('Error al cargar imagen:', err.message);
  }

  doc.fontSize(40)
     .fillColor('#000000')
     .text(`${match.nombre}`, 0, doc.page.height / 2 - 20, {
       align: 'center',
     });

  const fechaHora = new Date().toLocaleString("es-MX");
    doc.fontSize(20)
    .text(`Fecha y hora: ${fechaHora}`, 0, doc.page.height / 2 + 30, {
     align: 'center',
    });

  doc.end();

};