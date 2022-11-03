const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
})

//static register method
userSchema.statics.register = async function (username, password) {
    //input validation
    if(!username || !password){
        throw Error('All fields must be filled.')
    }
    if (!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough.')
    }
    
    const exists = await this.findOne({ username })

    if(exists) {
        throw Error('Username already exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, password: hash })

    console.log(`${username} has just became a user!`)

    return user
}

//static login method
userSchema.statics.login = async function(username, password){
    if(!username || !password){
        throw Error('All fields must be filled.')
    }

    const user = await this.findOne({ username })

    if(!user) {
        throw Error('Incorrect Username or Password')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect Username or Password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)