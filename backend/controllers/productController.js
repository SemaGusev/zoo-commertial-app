import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// AsyncHandler - простое промещуточное ПО для обработки ошибок

// async  возвращает Promise. Promise используется для отложенных и асинхронных вычислений,
// т.е. функция не сработает пока не будет вызвана. Делается для удобства и/или экономии вычислительной мощности

// Product некая абстрактная модель, по которой будет отправлен запрос на сервер

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({})

	// прислать ответ в виде JSON файла и products внутри
	res.json(products)
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		res.json(product)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

export { getProducts, getProductById }
