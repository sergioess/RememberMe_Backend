const express = require('express');
const router = express.Router();

let notificationController = require('../controllers/notificationController')

let notificacion = express.Router();

notificacion.route('/notificacion/:id').get(notificationController.readByIdUsr)

notificacion.route('/notificacioncount/:id').get(notificationController.countUnreadByUsr)

notificacion.route('/notificacion/:id').put(notificationController.updateNotifRead)


module.exports = notificacion;