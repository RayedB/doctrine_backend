const express = require('express')
const router = express.Router()

router.get('/', require('./controllers/index'))
router.get('/jurisdiction/:jurisdiction_id', require('./controllers/jurisdiction'))
router.get('/getJurisdictionContactInfos/:jurisdiction_id', require('./controllers/getJurisdictionContactInfos'))

module.exports = router
