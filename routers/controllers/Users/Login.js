const bcrypt = require('bcryptjs')
const { promisify } = require('util');
const { User } = require('./../../../model/User');
const jwt = require('jsonwebtoken')

const comparePassword = promisify(bcrypt.compare);
const jwtSign = promisify(jwt.sign)

module.exports.login = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {

            if (!user) return Promise.reject({ status: 404, message: "User is not exist" });
            return Promise.all([comparePassword(password, user.password), user])
        })
        .then(result => {
            const isMatch = result[0];
            const user = result[1];
            if (!isMatch) return Promise.reject({ status: 400, message: "Password incorrect" })
            const payload = {
                email: user.email,
                userType: user.userType
            }
            return jwtSign(payload, "Ceyber", { expiresIn: 3600 })

        })
        .then(token=>{
           res.status(200).json({message:"Success",token})
        })
        .catch(err=>{
            if(err.status) return res.status(err.status).json(err.message)
            return res.status(500).json(err)
        })

}
