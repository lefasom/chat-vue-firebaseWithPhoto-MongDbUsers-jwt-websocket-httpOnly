const User = require('../models/User')
const jwt = require('jsonwebtoken')
const secretKey = 'tu_clave_secreta' // Cambia esto a una clave secreta segura

const getUsers = async (req, res) => {
  const users = await User.find()
  res.json(users)
}

const createUser = async (req, res) => {
  const { userName, password, email, photo, connection } = req.body
  if(userName== null){
    res.json({ message: 'Ingrese un nombre de usuario', error: true })
  }
  const verUserName = await User.findOne({ userName })
  const verEmail = await User.findOne({ email })

  if (!verUserName && !verEmail) {
    try {
      const newUser = await User.create({ userName, password, email, photo, connection })
      console.log(newUser)

      res.json({ message: 'Usuario Creado', newUser, error: false })
    } catch (error) {
      console.error(error)
    }
  } else if (verUserName) {
    res.json({ message: 'Nombre de usuario ya existe', error: true })
  } else if (verEmail) {
    res.json({ message: 'Email ya existe', error: true })
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

const perfilConfig = async (req, res) => {
  const { _id, userName, password, email, photo, connection } = req.body
  const username_a = await User.findOne({ userName })
  const username_b = await User.findOne({ userName, _id })

  const correo_a = await User.findOne({ email })
  const correo_b = await User.findOne({ email, _id })

  if (!username_b && username_a) {
    res.json({ message: 'Nombre de usuario ya existe' })
  } else if (!correo_b && correo_a) {
    res.json({ message: 'Email ya existe' })
  } else {
    await User.findByIdAndUpdate(_id, { userName, password, email, photo, connection })
    res.json({ message: 'Modificado con exito' })
  }

}

const getUser = async (req, res) => {
  const { userName, password } = req.body
  try {
    const username = await User.findOne({ userName })
    if (!username) {
      return res.json({ message: 'No existe usuario' })
    } else {
      const user = await User.findOne({ password, userName })

      if (user) {
        const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' })
        // Calcular la fecha de vencimiento en 15 minutos
        const currentTime = new Date();
        const expirationTime = new Date(currentTime.getTime() + 15 * 60 * 1000); // 15 minutos en milisegundos

        // Configurar la cookie con las opciones adecuadas
        res.cookie('authToken', token, {
          expires: expirationTime,
          httpOnly: true,
          // secure: true, // Asegura que la cookie solo se envíe a través de HTTPS
          // sameSite: 'strict' // Restringe la cookie a solicitudes del mismo sitio
        })

        res.redirect('/getLogin')
      } else {
        return res.json({ message: 'Contraseña incorrecta' })

      }

    }
  } catch (error) {
    console.error(error)
  }
}


const getLogin = async (req, res) => {
  const authToken = req.cookies.authToken
  if (!authToken) {
    return res.json({ message: 'No hay sesiones guardadas' })
  }

  try {
    const decodedToken = jwt.verify(authToken, secretKey)
    const _id = decodedToken.user._id
    if (_id) {
      const user = await User.findOne({ _id })
      // console.log(user)
      return res.json({ message: 'Usuario autenticado', user })
    } else {
      return res.json({ message: 'No hay sesiones guardadas' })
    }

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
  perfilConfig
}