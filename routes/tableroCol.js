const express = require('express');
const router = express.Router();

let tableroColController = require('../controllers/tableroColController')

let tablero_colaboradores = express.Router();


tablero_colaboradores.route('/tablero_colaboradores/:id')
    .get(tableroColController.readAllColTableros)

tablero_colaboradores.route('/tablero_colaboradores')
    .post(tableroColController.create)

tablero_colaboradores.route('/tablero_colaboradores/:id')
    .delete(tableroColController.deleteTablero_colaboradores)


module.exports = tablero_colaboradores;

