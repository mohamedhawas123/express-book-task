import express from 'express'
import {authUser, registerUser} from '../controller/userControllers.js'


const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', authUser)

export default router