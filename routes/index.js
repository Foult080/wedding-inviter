const router = require('express').Router()
const version = require('../package.json').version
const db = require('../utils/db.js')

// api routes
// check health route
router.get('/health', async (req, res) => {
  return res.status(200).json({ success: true, version, msg: 'Сервис работает стабильно' })
})

//get guests
router.get('/guests', async (req, res) => {
  try {
    const [guests] = await db.query('select id, guest, invite_msg, additional_guest, guest_count, tel_number, status, mddate from guests;');
    const [guestCount] = await db.query('select sum(guest_count) from guests');
    return res.status(200).json({success: true, data: guests, count: guests.length, guestCount});
  } catch (error) {
    console.error(error);
    return res.status(500).json({msg: 'Internal Error', error});
  }
})

// 404 not found
router.use('*', async (req, res) => {
  res.status(404).json({ success: false, msg: 'Маршрут не распознан' })
})

module.exports = router
