const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')

const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, '../public')

io.on('connection', (socket) => {
    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message', 'A new User Joined')


    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()
        if(filter.isProfane(message)){
            return callback('Profanity not allowed')
        }
        io.emit('message', message)
        callback()
    })

    socket.on('disconnect', ()=>{
        io.emit('message', 'A user has left!')
    })

    socket.on('sendLocation', (coords, callback) =>{
        io.emit('locationMessage', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        callback();
    })
})

app.use(express.static(publicDirectoryPath))

server.listen(port, () => {
    console.log('Application started at port: ' + port)
})