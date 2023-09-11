const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const User = require('./models/User')
const routes = require('./routes/index')
const app = express()
const jwt = require('jsonwebtoken')
const secretKey = 'tu_clave_secreta' // Cambia esto a una clave secreta segura

const cors = require('cors')
app.name = 'backend'

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cookieParser())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

app.use(cors({ credentials: true, origin: true }))

app.post('/getUser', async (req, res) => {
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
})

app.get('/getLogin', (req, res) => {
  const authToken = req.cookies.authToken
  if (!authToken) {
    return res.status(401).json({ message: 'No se encontró la cookie de autenticación' })
  }

  try {
    const decodedToken = jwt.verify(authToken, secretKey)
    const user = decodedToken.user
    return res.json({ message: 'Usuario autenticado', user })
  } catch (error) {
    console.error(error)
    return res.status(401).json({ message: 'Error al verificar el token de autenticación' })
  }
})

app.get('/borrarCookie', (req, res) => {
  res.clearCookie('authToken')
  res.send('Cookie borrada')
})

app.use('/', routes)

module.exports = app;
