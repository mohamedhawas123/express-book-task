import asyncHandler from 'express-async-handler'
import express from 'express'
import User from '../models/userModel.js'
import generateToken from '../utilits/token.js'



const authUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body

    if (!email || !password) {
        res.status(400).json({ error: "Please provide all required fields" })
        return
    }


    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password)) ) {
        res.json({
            _id: user._id,
            name: user.name,
            email:user.email,
            token: generateToken(user._id) 
        })
    } else {
        res.status(401)
        throw new Error("InValid email or Password")
    }

})


const registerUser = asyncHandler(async (req, res) => {

    const {name, email, password} = req.body

    if (!email || !password || !name) {
        res.status(400).json({ error: "Please provide all required fields" })
        return
    }

    const userExist = await User.findOne({email})

    if (userExist) {
        res.status(400)
        throw new Error("User already Exist")
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email:user.email,
           
            token: generateToken(user._id) 
        })
    }else {
        res.status(400)
        throw new Error("something went wrong")
    }

})







export {
    authUser,
    registerUser,

}
 