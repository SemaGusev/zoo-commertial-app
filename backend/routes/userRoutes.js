import express from 'express'
const router = express.Router()
import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

// Муршрутизация в express
// https://expressjs.com/ru/starter/basic-routing.html
// router - это экземпляр express.
// post - метод запроса HTTP.
// /login - путь на сервере.
// authUser - функция, выполняемая при сопоставлении маршрута.
router.route('/').post(registerUser)
router.post('/login', authUser)
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)

export default router

// Express поддерживает перечисленные далее методы маршрутизации, соответствующие методам HTTP:
// get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity,
// checkout, merge, m-search, notify, subscribe, unsubscribe, patch, search и connect.
