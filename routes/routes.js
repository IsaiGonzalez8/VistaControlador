var express = require('express');

var userController = require('../src/user/userController');
const router = express.Router();

// ruta para login
router.route('/user/login').post(userController.loginUserControllerFunc);
// ruta para crear usuario
router.route('/user/create').post(userController.createUserControllerFunc);
// ruta para buscar un usuario
router.route('/user/search').get(userController.searchUserControllerFunc);
//ruta para borrar usuario
router.route('/user/delete').delete(userController.deleteUserControllerFunc);
//ruta para actualizar
router.route('/user/update').put(userController.updateUserControllerFunc);

module.exports = router;
