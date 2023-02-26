const userRouter = require('./users.router') // la importamos
const express = require('express');
const router = express.Router();

// colocar tus rutas aquí
router.use("/users", userRouter); // la ejecutamos

module.exports = router;