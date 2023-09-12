const { Router } = require('express')
const router = Router()
const userController = require('../controllers/userController')

router.post('/postUser', userController.createUser)
router.get('/getUsers', userController.getUsers)
router.get('/borrarCookie', userController.borrarCookie)
router.post('/getUser', userController.getUser)
router.get('/getLogin', userController.getLogin)
router.put('/updateUser', userController.updateUser)

module.exports = router