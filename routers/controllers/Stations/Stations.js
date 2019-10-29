const { Station } = require('./../../../model/Stations');

module.exports.createStation = (req, res, next) => {
    const { name, address, province } = req.body;
    const newStation = new Station({ name, address, province });
    Station.findOne({ name })
        .then(station => {
            if (station) return Promise.reject({ status: 404, message: 'Name Station exist' })
            return newStation.save()
        })
        .then(station => res.status(200).json(station))
        .catch(err => {
            if (err.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })
}
module.exports.getStation = (re, res, next) => {
    Station.find()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => res.status(404).json(err))
}
module.exports.getStationById = (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    Station.findById(id)
        .then(station => {
            if (!station) return Promise.reject({ status: 404, message: "Station is not exist" })
            return res.status(200).json(station)
        })
        .catch(err => {
            if (err.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })
}
module.exports.updateById=(req,res,next)=>{
    const {id}=req.params;
    const { name, address, province } = req.body;
    Station.findById(id)
    .then(station=>{
        if (!station) return Promise.reject({ status: 404, message: "Station is not exist" })
        station.name=name,
        station.address=address,
        station.province=province
        return station.save()
    })
    .then(station=>res.status(200).json(station))
    .catch(err => {
        if (err.status) return res.status(err.status).json(err.message)
        return res.status(500).json(err)
    })
}
module.exports.deleteById=(req,res,next)=>{
    const {id}=req.params;
    Station.deleteOne({_id:id})
    .then(()=>res.status(200).json({message:"Delete successfully"}))
    .catch(err=>res.status(404).json(err))
}