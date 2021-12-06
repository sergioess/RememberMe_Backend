const express = require('express');
const router = express.Router();

let tableroController = require('../controllers/tableroController')

let tablero = express.Router();



tablero.route('/tablero/:id').get(tableroController.readAllTablero)
tablero.route('/tablerousr/:id_usuario').get(tableroController.readAllTableroUsr)
tablero.route('/tablero').post(tableroController.create)
tablero.route('/tablero/:id').delete(tableroController.deleteTablero)
tablero.route('/tablerocolabora/:id').get(tableroController.tableroColaboradores)
tablero.route('/removecolabora/:id').delete(tableroController.removeColaborador)
tablero.route('/updaterolcol/:id').put(tableroController.udpdaterolcol)

module.exports = tablero;

