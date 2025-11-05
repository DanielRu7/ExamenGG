const express = require("express");
const router = express.Router();
const { startQuiz, submitAnswers } = require("../controllers/questions.controllers.js");//questions.controllers

const { verifyToken } = require("../middleware/auth.middleware.js");//middleware/auth.middleware

//solo usuarios con token pueden accedr 
router.post("/start", verifyToken, startQuiz);
router.post("/submit", verifyToken, submitAnswers);

module.exports = router;
