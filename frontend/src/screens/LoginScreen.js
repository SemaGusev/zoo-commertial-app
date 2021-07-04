import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'

// Если появляется ошибка "Unexpected use of 'history'"
//нужно прописать его прямо здесь   ||
//                                  ||
const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')

	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin

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
		dispatch(login(email, password))
	}

	return (
		<FormContainer>
			<h1>Войти</h1>
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
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

				{/* <Form.Group controlId="phoneNumber">
					<Form.Label>Номер телефона</Form.Label>
					<Form.Control
						type="phoneNumber"
						placeholder="+375(29)123-45-67"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
					></Form.Control>
				</Form.Group> */}
				<Button type="submit" variant="success">
					Войти
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					Новый пользователь?{' '}
					<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
						Регистрация
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default LoginScreen
