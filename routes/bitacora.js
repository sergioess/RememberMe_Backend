const express = require('express');
const router = express.Router();

let bitacoraController = require('../controllers/bitacoraController')

let bitacora = express.Router();


bitacora.route('/bitacora/:id')
    .get(bitacoraController.readAll)

bitacora.route('/bitacora')
    .post(bitacoraController.create)



module.exports = bitacora;