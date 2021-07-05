import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

// Если появляется ошибка "Unexpected use of 'history'"
//нужно прописать его прямо здесь   ||
//                                  ||
const ProfileScreen = ({ location, history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)
	// const [phoneNumber, setPhoneNumber] = useState('')

	const dispatch = useDispatch()

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
	const { success } = userUpdateProfile

	useEffect(() => {
		if (!userInfo) {
			history.push('/login')
		} else {
			if (!user.name) {
				dispatch(getUserDetails('profile'))
			} else {
				setName(user.name)
				setEmail(user.email)
			}
		}
	}, [dispatch, history, userInfo, user]) // Все что находится в [.. .. .. ]  является зависсимостью/-ями, суть которых в том, что useEffect
	// будет вызван только при изменении значений этих/этой зависсимости/тей

	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			setMessage('Passwords do not match')
		} else {
			dispatch(updateUserProfile({ id: user._id, name: email, password }))
		}
	}

	return (
		<Row>
			<Col md={3}>
				<h2>Профиль</h2>
				{message && <Message variant="danger">{message}</Message>}
				{error && <Message variant="danger">{error}</Message>}
				{success && <Message variant="success">Профиль обновлен</Message>}
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

					<Form.Group controlId="password1">
						<Form.Label>Пароль</Form.Label>
						<Form.Control
							type="password"
							placeholder="password123"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="password2">
						<Form.Label>Подтверждение пароля</Form.Label>
						<Form.Control
							type="password"
							placeholder="password123"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					{/* <Form.Group controlId="phoneNumber">
						<Form.Label>Номер телефона</Form.Label>
						<Form.Control
							type="text"
							className="phoneNumber"
							placeholder="+375(29)123-45-67"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
						></Form.Control>
					</Form.Group> */}
					<Button type="submit" variant="success">
						Обновить
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>Мои заказы</h2>
			</Col>
		</Row>
	)
}

export default ProfileScreen
