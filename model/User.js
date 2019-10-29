const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash);

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    password2: { type: String, required: true },
    fullName: { type: String, required: true },
    userType: { type: String, default: 'user' },
    // avatar: { type: String, required: false }
})
UserSchema.pre("save", function save(next) {
    const user = this;
    /**
     * @params isModified xác định password nhập vào có đúng hay ddax thay đổi
     */
    if (!user.isModified("password")) return next();
    genSalt()
        .then(salt =>{
           return Promise.all([hash(user.password, salt),hash(user.password2,salt)])
        } )
        .then(hash => {
            user.password = hash[0];
            user.password2=hash[1];
            next();
        })
        .catch(err => next(err))


})
const User = mongoose.model('User', UserSchema, 'User');

module.exports = {
    User,
    UserSchema
}