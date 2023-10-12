const router = require('express').Router()
const version = require('../package.json').version

// api routes
// check health route
router.get('/health', async (req, res) => {
  return res.status(200).json({ success: true, version, msg: 'Сервис работает стабильно' })
})

// 404 not found
router.use('*', async (req, res) => {
  res.status(404).json({ success: false, msg: 'Маршрут не распознан' })
})

module.exports = router
