require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
// cors
const cors = require('cors')
app.use(cors())

// use json encode
app.use(express.json({ extended: false }))

// add router
app.use('/api', require('./routes'))

// добавляем статичную директорию с билдом фронта
app.use(express.static(path.join(__dirname, 'frontend', 'build')))
app.get('*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, 'front', 'dist', 'index.html'))
})

// initial port to star
const PORT = process.env.PORT || 5000

// server app
const server = app.listen(PORT, () => console.log(`Server is running on ${PORT}`))

// тесты mocha
module.exports = { app, server }
