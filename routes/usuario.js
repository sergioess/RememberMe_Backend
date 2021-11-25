const express = require('express');
const router = express.Router();

let usuarioController = require('../controllers/usuarioController')

let usuarios = express.Router();

usuarios.route('/usuarios')
    .get(usuarioController.readAll)

usuarios.route('/usuarios/:id')
    .get(usuarioController.readById)

usuarios.route('/usuarios')
    .post(usuarioController.create)

usuarios.route('/usuarios/:id')
    .delete(usuarioController.deleteUsuario)

usuarios.route('/usuarios/:id')
    .put(usuarioController.updateUsuario)

usuarios.route('/usuariosemail/:email')
    .get(usuarioController.readByEmail)


/* usuarios.route('/tareasusuario/:id')
    .get(tareaController.tareasUsuario)

usuarios.route('/tareasclasificacion/:id')
    .get(tareaController.tareasClasificacion)

usuarios.route('/tareasusrclas/:id')
    .get(tareaController.TareasUsuarioClasificacion) */

module.exports = usuarios;

