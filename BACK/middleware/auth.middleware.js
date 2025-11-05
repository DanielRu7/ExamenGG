const crypto = require('crypto');

// Almacenamiento en memoria de las sesiones activas
// Estructura: { token: userId }
const sessions = new Map();

/**
 * Middleware para verificar el token de sesión
 * Espera el token en el header: Authorization: Bearer <token>
 */
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Token no proporcionado o formato incorrecto',
      formato_esperado: 'Authorization: Bearer <token>'
    });
  }

  const token = authHeader.substring(7); // Remover 'Bearer '
  const userId = sessions.get(token);

  if (!userId) {
    return res.status(401).json({
      error: 'Token inválido o expirado'
    });
  }

  // Agregar info del usuario al request
  req.userId = userId;
  req.token = token;

  next();
}

/**
 * Crear una nueva sesión
 * @param {string} userId - ID del usuario
 * @returns {string} token - Token generado
 */
function createSession(userId) {
  // Genera token seguro con crypto.randomUUID o fallback a randomBytes
  const token = (typeof crypto.randomUUID === 'function')
    ? crypto.randomUUID()
    : crypto.randomBytes(32).toString('hex');

  sessions.set(token, userId);
  return token;
}

/**
 * Eliminar una sesión (logout)
 * @param {string} token - Token a eliminar
 * @returns {boolean} - True si se eliminó, false si no existía
 */
function deleteSession(token) {
  return sessions.delete(token);
}

/**
 * Obtener número de sesiones activas (para debugging)
 */
function getActiveSessions() {
  return sessions.size;
}

/**
 * Limpiar todas las sesiones (mantenimiento)
 */
function clearAllSessions() {
  sessions.clear();
}

module.exports = {
  verifyToken,
  createSession,
  deleteSession,
  getActiveSessions,
  clearAllSessions
};
