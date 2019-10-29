const TripController = require('./Trips')

const express = require('express');
const router = express();
router.post('/', TripController.createTrip)
router.get('/', TripController.getTrips)
router.get('/:id', TripController.getTripById)
router.delete('/:id', TripController.deleteTrip)
module.exports = router;