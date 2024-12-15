import express from 'express'

import { createTodo, deleteTodo, getTodo, updateTodo } from '../controller/todo.controller.js'
import { authonticate } from '../middleware/authorize.js'

const router = express.Router()

router.post('/create', authonticate, createTodo)
router.get('/fetch',authonticate, getTodo)
router.put('/update/:id',authonticate, updateTodo)
router.delete('/delete/:id',authonticate, deleteTodo)

export default router