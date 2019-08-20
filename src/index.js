const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, '../public')

let count = 0

io.on('connection', (socket) => {
    console.log('New connection')
    socket.emit('countUpdated', count)

    socket.on('increment', () =>{
        count++;
        io.emit('countUpdated', count)
    })
})

app.use(express.static(publicDirectoryPath))

server.listen(port, () => {
    console.log('Application started at port: ' + port)
})