const express = require("express");
const { login, logout, getProfile, getDatos,getPago,setPago,getExamen,setExamen,certificado} = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth.middleware");

const router = express.Router();

// Ruta pública: POST /api/login
router.post("/login", login);

// Rutas protegidas (requieren token)
// POST /api/logout - Cerrar sesión
router.post("/logout", verifyToken, logout);

// GET /api/profile - Obtener perfil del usuario autenticado
router.get("/profile", verifyToken, getProfile);


router.post("/comentarios",verifyToken,getDatos);

router.post("/getpago",verifyToken,getPago);

router.post("/pago",verifyToken,setPago);

router.post("/getexamen",verifyToken,getExamen);

router.post("/setexamen",verifyToken,setExamen);

router.post("/certificado",verifyToken,certificado);

module.exports = router;
