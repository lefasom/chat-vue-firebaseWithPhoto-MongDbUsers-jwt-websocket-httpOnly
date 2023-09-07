const jwt = require('jsonwebtoken')
const secretKey = 'tu_clave_secreta' // Cambia esto a una clave secreta segura

const User = require('../models/User')



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
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName, password });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' });

      // Configura la cookie de autenticación
      res.cookie('authToken', token, { maxAge: 3600000, httpOnly: true }); // 1 hora de duración
console.log('token',token)
      // Puedes enviar una respuesta al cliente si lo deseas
      // return res.json({ message: 'Inicio de sesión exitoso', token, user });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

const getLogin = async (req, res) => {
  // // Recupera la cookie de autenticación
  // const authToken = req.cookies.authToken;
  
  // // Verifica si la cookie está presente
  // if (!authToken) {
  //   return res.status(401).json({ message: 'No se encontró la cookie de autenticación' });
  // }

  // try {
  //   // Verifica y decodifica el token JWT
  //   const decodedToken = jwt.verify(authToken, secretKey);
    
  //   // El token es válido, puedes acceder a los datos del usuario
  //   const user = decodedToken.user;
    
  //   // Continúa con la lógica de autenticación, por ejemplo, enviar los datos del usuario
  //   return res.json({ message: 'Usuario autenticado', user });
  // } catch (error) {
  //   console.error(error);
  //   return res.status(401).json({ message: 'Error al verificar el token de autenticación' });
  // }
};
module.exports = { getUsers, createUser, updateUser, getUser, getLogin }