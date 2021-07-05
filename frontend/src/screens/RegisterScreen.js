import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'

// Если появляется ошибка "Unexpected use of 'history'"
//нужно прописать его прямо здесь   ||
//                                  ||
const RegisterScreen = ({ location, history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)
	// const [phoneNumber, setPhoneNumber] = useState('')

	const dispatch = useDispatch()

	const userRegister = useSelector((state) => state.userRegister)
	const { loading, error, userInfo } = userRegister

	//split - превращает строку в массив элементов
	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		if (userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect]) // Все что находится в [.. .. .. ]  является зависсимостью/-ями, суть которых в том, что useEffect
	// будет вызван только при изменении значений этих/этой зависсимости/тей

	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			setMessage('Passwords do not match')
		} else {
			dispatch(register(name, email, password))
		}
	}

	return (
		<FormContainer>
			<h1>Регистрация</h1>
			{message && <Message variant="danger">{message}</Message>}
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="name">
					<Form.Label>Фамилия и имя</Form.Label>
					<Form.Control
						type="name"
						placeholder="Иванов Иван"
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="email">
					<Form.Label>Адрес электронной почты</Form.Label>
					<Form.Control
						type="email"
						placeholder="example@gmail.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="password">
					<Form.Label>Пароль</Form.Label>
					<Form.Control
						type="password"
						placeholder="password123"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="password">
					<Form.Label>Подтверждение пароля</Form.Label>
					<Form.Control
						type="password"
						placeholder="password123"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				{/* <Form.Group controlId="tel">
					<Form.Label>Номер телефона</Form.Label>
					<Form.Control
						type="text"
						className="tel"
						id="tel"
						placeholder="+375(29)123-45-67"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
					></Form.Control>
				</Form.Group> */}
				<Button type="submit" variant="success">
					Регистрация
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					Уже есть аккаунт?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
						Войти
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default RegisterScreen
