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

tablero_colaboradores.route('/tablero_colaboradores_acepta/:id')
    .put(tableroColController.updateAceptaEstadoColaborador)


module.exports = tablero_colaboradores;

