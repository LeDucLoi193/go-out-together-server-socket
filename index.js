const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: "*:*",
  }
})
require('dotenv').config()

io.on('connection', (socket) => {
	// new user come into session
	socket.on('new_user_coming', () => {
		io.sockets.emit('refetch_sesion_detail')
	})

	// add new locations
	socket.on('add_location', () => {
		io.sockets.emit('refetch_add_location')
	})

	// delete new locations
	socket.on('delete_location', () => {
		io.sockets.emit('refetch_delete_location')
	})

	// vote location
	socket.on('vote', () => {
		io.sockets.emit('refetch_vote')
	})
})

const port = process.env.SERVER_PORT ?? 3001
server.listen(port, () => console.log(`Server is running at port ${port}`))