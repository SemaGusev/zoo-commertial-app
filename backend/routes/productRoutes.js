import express from 'express'

// Обработка запросов, адресованных конкретным ресурсам. Мини-приложение для маршрутизации
// https://expressjs.com/ru/guide/routing.html
const router = express.Router()
import {
	getProductById,
	getProducts,
} from '../controllers/productController.js'

router.route('/').get(getProducts)

// Функция промежуточной обработки, монтируемая в путь /:id
router.route('/:id').get(getProductById)

export default router

// Метод router.route() позволяет создавать обработчики маршрутов, образующие цепочки, для пути маршрута.

// Данное приложение теперь сможет обрабатывать запросы, адресованные ресурсам / и /РандомныйАйдиПользователя,
// а также вызывать специальную функцию промежуточной обработки timeLog данного маршрута.

// https://expressjs.com/ru/guide/using-middleware.html
