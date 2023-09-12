const User = require('../models/User')
const jwt = require('jsonwebtoken')
const secretKey = 'tu_clave_secreta' // Cambia esto a una clave secreta segura

const getUsers = async (req, res) => {
  const users = await User.find()
  res.json(users)
}

const createUser = async (req, res) => {
  const { userName, password, email, photo, connection } = req.body
  try {
    const newUser = await User.create({ userName, password, email, photo, connection })
    console.log(newUser)

    res.json(newUser)
  } catch (error) {
    console.error(error)
  }
}

const updateUser = async (req, res) => {
  const { _id, userName, password, email, photo, connection } = req.body
  try {
    await User.findByIdAndUpdate(_id, { userName, password, email, photo, connection })
    res.json({ message: 'Personal Info updated' })
  } catch (error) {
    console.error(error)
  }
}

 const getUser = async (req, res) => {
  const { userName, password } = req.body
  try {
    const user = await User.findOne({ userName, password })
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    } else {
      const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' })
      // Calcular la fecha de vencimiento en 15 minutos
      const currentTime = new Date();
      const expirationTime = new Date(currentTime.getTime() + 15 * 60 * 1000); // 15 minutos en milisegundos

      // Configurar la cookie con las opciones adecuadas
      res.cookie('authToken', token, {
        expires: expirationTime,
        httpOnly: true,
        secure: true, // Asegura que la cookie solo se envíe a través de HTTPS
        sameSite: 'strict' // Restringe la cookie a solicitudes del mismo sitio
      })

      res.redirect('/getLogin')
    }
  } catch (error) {
    console.error(error)
  }
}


const getLogin = (req, res) => {
  const authToken = req.cookies.authToken
  if (!authToken) {
    return res.json({ message: 'No hay sesiones guardadas' })
  }

  try {
    const decodedToken = jwt.verify(authToken, secretKey)
    const user = decodedToken.user
    return res.json({ message: 'Usuario autenticado', user })
  } catch (error) {
    console.error(error)
    return res.status(401).json({ message: 'Error al verificar el token de autenticación' })
  }
}

const borrarCookie = (req, res) => {
  res.clearCookie('authToken')
  res.send('Cookie borrada')
}
module.exports = {
  getUsers,
  createUser,
  updateUser,
  borrarCookie,
  getLogin,
  getUser,
}