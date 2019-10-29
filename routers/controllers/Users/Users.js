const { User } = require('./../../../model/User');
module.exports.registerUser = (req, res, next) => {
    const { email, password, password2, fullName, userType } = req.body;
    const newUser = new User({ email, password, password2, fullName, userType })
    User.findOne({ email })
        .then(user => {
        
            if (user) return Promise.reject({ status: 404, message: "Email existed" })
            console.log(newUser)
            return newUser.save()
        })
        
        .then(user =>{
            res.status(200).json(user)
        } )
        .catch(err => {
            if (err.status) return res.status(err.status).json({ message: err.message })
            return res.status(500).json(err)
        })


}