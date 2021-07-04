import mongoose from 'mongoose'
import colors from 'colors'

// MONGOOSE - то, при помощи чего мы подключаемся к MONGO DB и делаем при помощи
// встроенных в MONGOOSE запросов вроде .connect, .find, .save запросы на сервер
// https://mongoosejs.com/docs/index.html

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		})

		console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
	} catch (error) {
		console.error(`Error: ${error.message}`.red.underline.bold)
		process.exit(1)
	}
}

export default connectDB
