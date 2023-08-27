const jwt = require('jsonwebtoken');
const secretKey = 'tu_clave_secreta'; // Cambia esto a una clave secreta segura

const User = require('../models/User')



const getUsers = async (req, res) => {
  const users = await User.find()
  // console.log(users)
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
  console.log(_id, userName, password, email, photo, connection)
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
      const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' }); // Cambia el tiempo de expiración según tus necesidades

      return res.json({ message: 'Inicio de sesión exitoso', token, user });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const getLogin = async (req, res) => {
  const { token } = req.body;
  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      return res.json(decoded);
    } catch (error) {
      // Maneja errores de verificación aquí, como tokens inválidos o expirados
      throw new Error('Error al decodificar el token: ' + error.message);
    }
  }else{
    return  res.json('No token');
  }


};
module.exports = { getUsers, createUser, updateUser, getUser, getLogin }