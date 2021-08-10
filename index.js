const express = require('express')
const app = express()
const httpServer = require("http").createServer()
const io = require('socket.io')(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://go-out-together.vercel.app"]
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
app.listen(port, () => console.log(`Server is running at port ${port}`))
httpServer.listen(8081)