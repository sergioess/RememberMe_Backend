const express = require('express');
const router = express.Router();

let categoriaController = require('../controllers/categoriasController')

let categoria = express.Router();

categoria.route('/categoria').get(categoriaController.readAll)

categoria.route('/categoria/:id').get(categoriaController.readById)

categoria.route('/categoriausr/:id').get(categoriaController.readAllByIdusr)

categoria.route('/categoria').post(categoriaController.create)

categoria.route('/categoria/:id').post(categoriaController.readById)

categoria.route('/categoria/:id').delete(categoriaController.deleteCategoria)

categoria.route('/categoria/:id').put(categoriaController.updateCategoria)


module.exports = categoria;