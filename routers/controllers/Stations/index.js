const StationController = require('./Stations')

const express = require('express');
const router = express();
router.post('/', StationController.createStation)
router.get('/', StationController.getStation)
router.get('/:id', StationController.getStationById)
router.put('/:id', StationController.updateById)
router.delete('/:id', StationController.deleteById)
module.exports = router;