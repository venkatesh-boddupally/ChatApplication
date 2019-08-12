const express = require('express')
const path = require('path')

const port = process.env.PORT || 3000

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.listen(port, () => {
    console.log('Application started at port: ' + port)
})