const express = require('express')
const app = express()
var server = app.listen(3002, () => console.log(`socket.io on port 3002`))
// Configurar CORS para permitir todas las solicitudes desde cualquier origen
var io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
})

// Configurar eventos de Socket.io
io.on('connection', (socket) => {
  // Aquí puedes definir tus manejadores de eventos Socket.io
  socket.on('login', (data) => {
    io.emit('updateUser')
  })
})

