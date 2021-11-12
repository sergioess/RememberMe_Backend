const express = require('express');
const router = express.Router();

let tareaController = require('../controllers/tareaController')

let tareas = express.Router();

tareas.route('/tareas')
    .get(tareaController.readAll)

tareas.route('/tareas/:id')
    .get(tareaController.readById)

tareas.route('/tareas')
    .post(tareaController.create)

tareas.route('/tareas/:id')
    .delete(tareaController.deleteTarea)

tareas.route('/tareas/:id')
    .put(tareaController.updateTarea)

tareas.route('/tareasusuario/:id')
    .get(tareaController.tareasUsuario)

tareas.route('/tareasclasificacion/:id')
    .get(tareaController.tareasClasificacion)
tareas.route('/tareasusrclas/:id')
    .get(tareaController.TareasUsuarioClasificacion)

module.exports = tareas;

