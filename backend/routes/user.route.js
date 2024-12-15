import express from 'express'
import { login, logout, register } from '../controller/user.controller.js'

const router = express.Router()

// routes
router.post('/signup', register)
router.post('/login', login)
router.get('/logout', logout)

export default router