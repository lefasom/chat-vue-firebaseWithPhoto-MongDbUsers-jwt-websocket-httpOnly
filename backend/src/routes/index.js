const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController')
router.post('/postUser', userController.createUser)
router.get('/getUsers', userController.getUsers)
router.post('/getUser', userController.getUser)
router.post('/getLogin', userController.getLogin)
router.put('/updateUser', userController.updateUser)
// router.post('/registerOrLogin', userController.createUser)
// router.put('/logout', userController.logout)
// router.put('/addFavor', userController.addToFavorites)

module.exports = router;