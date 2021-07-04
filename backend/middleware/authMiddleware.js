import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// AsyncHandler - простое промещуточное ПО для обработки ошибок

// async  возвращает Promise. Promise используется для отложенных и асинхронных вычислений,
// т.е. функция не сработает пока не будет вызвана. Делается для удобства и/или экономии вычислительной мощности

const protect = asyncHandler(async (req, res, next) => {
	let token

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			// split - разделяет значение на массив строк
			token = req.headers.authorization.split(' ')[1]

			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			req.user = await User.findById(decoded.id).select('-password')

			next()
		} catch (error) {
			console.error(error)
			res.status(401)
			throw new Error('Not authorized, token failed')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Not authorized, no token')
	}
})

// Один маршрут может обрабатываться несколькими функциями обратного вызова (обязательно укажите объект next)
const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next()
	} else {
		res.status(401)
		throw new Error('Not authorized as an admin')
	}
}

const manager = (req, res, next) => {
	if (req.user && req.user.isManager) {
		next()
	} else {
		res.status(401)
		throw new Error('Not authorized as a manager')
	}
}

export { protect, admin, manager }
