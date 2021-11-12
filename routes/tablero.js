const express = require('express');
const router = express.Router();

let tableroController = require('../controllers/tableroController')

let tablero = express.Router();


tablero.route('/tablero/:id')
    .get(tableroController.readAllTablero)

tablero.route('/tablero')
    .post(tableroController.create)

tablero.route('/tablero/:id')
    .delete(tableroController.deleteTablero)


module.exports = tablero;

