const StationRouter=require('./controllers/Stations/index');
const TripRouter=require('./controllers/Trips/index')
const UserRouter=require('./controllers/Users/index')
const express = require('express');
const router = express();
router.use('/stations', StationRouter)
router.use('/trips', TripRouter)
router.use('/users', UserRouter)
module.exports = router;
