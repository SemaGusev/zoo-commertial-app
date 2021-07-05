import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart

	const [address, setAddress] = useState(shippingAddress.address)
	const [city, setCity] = useState(shippingAddress.city)
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
	const [country, setCountry] = useState(shippingAddress.country)
	const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber)

	const dispatch = useDispatch()

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			saveShippingAddress({ address, city, postalCode, country, phoneNumber })
		)
		history.push('/payment')
	}

	return (
		<FormContainer>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="address">
					<Form.Label>Адрес доставки</Form.Label>
					<Form.Control
						type="address"
						placeholder="ул.Рафиева д.123 кв.12"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="city">
					<Form.Label>Город</Form.Label>
					<Form.Control
						type="text"
						placeholder="Минск"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="postalCode">
					<Form.Label>Индекс</Form.Label>
					<Form.Control
						type="text"
						placeholder="0000200"
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="country">
					<Form.Label>Страна </Form.Label>
					<Form.Control
						type="text"
						placeholder="Беларусь"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="phoneNumber">
					<Form.Label>Номер телефона</Form.Label>
					<Form.Control
						type="text"
						placeholder="+375(25)123-45-67"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type="submit" variant="success">
					Продолжить
				</Button>
			</Form>
		</FormContainer>
	)
}

export default ShippingScreen
