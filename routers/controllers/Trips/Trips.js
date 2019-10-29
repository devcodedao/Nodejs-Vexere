const { Trip } = require('./../../../model/Trip');
const { Seat } = require('./../../../model/Seat')

const seatsCodes = [
    "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A010", "A011", "A012",
    "B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B09", "B010", "B011", "B012"
]
module.exports.createTrip = (req, res, next) => {

    const { fromStation, toStation, startTime, price } = req.body;
    const newTrip = new Trip({ fromStation, toStation, startTime, price })
    seatsCodes.forEach(code => {
        const newSeat = new Seat({ code })
        newTrip.seats.push(newSeat)
    })
    newTrip.save()
        .then(trip => res.status(200).json(trip))
        .catch(err => res.status(404).json(err))
}
module.exports.getTrips = (req, res, next) => {
    Trip.find()
        .then(user => {
            if (!user) return Promise.reject({ status: 404, message: "Array trip null" })
            return res.status(200).json(user)

        })
        .catch(err => {
            if (err.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })
}
module.exports.getTripById = (req, res, next) => {
    const { id } = req.params;
    Trip.findById(id)
        .then(trip => {
            if (!trip) return Promise.reject({ status: 404, message: "Id is exist or trip does not exist" })
            return res.status(200).json(trip)
        })
        .catch(err => {
            if (err.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })
}
module.exports.deleteTrip = (req, res, next) => {
    const { id } = req.params;
    Trip.deleteOne({ _id: id })
        .then(() => res.status(200).json({ message: "Delete successfully" }))
        .catch(err => res.status(404).json(err))
}