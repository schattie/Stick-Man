const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '12h'})
}

//login user
const loginUser = async (req, res) => {
    const {username, password} = req.body
    try{
        const user = await User.login(username, password) 

        //create token
        const token = createToken(user._id)

        res.status(200).json({username, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//register user
const registerUser = async (req, res) => {
    const {username, password} = req.body
    try{
        const user = await User.register(username, password) 

        //create token
        const token = createToken(user._id)

        res.status(200).json({username, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = { registerUser, loginUser }