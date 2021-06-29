import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'
import axios from 'axios'

const ProductScreen = ({ match }) => {
	const [product, setProduct] = useState({})

	useEffect(() => {
		const fetchProduct = async () => {
			const { data } = await axios.get(`/api/products/${match.params.id}`)

			setProduct(data)
		}

		fetchProduct()
	}, [match])

	return (
		<>
			<Link className="btn btn-outline-primary my-3" to="/">
				На главную
			</Link>
			<Row>
				<Col md={6}>
					<Image src={product.image} alt={product.name} fluid />
				</Col>
				<Col md={3}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>{product.name}</h2>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating
								value={product.rating}
								text={`${product.numReviews} reviews`}
							/>
						</ListGroup.Item>
						<ListGroup.Item>Цена: {product.price} BYN</ListGroup.Item>
						<ListGroup.Item>Описание: {product.description}</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<Row>
									<Col>Цена: </Col>
									<Col>
										<strong>{product.price} BYN</strong>
									</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>В наличии: </Col>
									<Col>
										<strong>{product.countInStock > 0 ? 'Есть' : 'Нет'}</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									className="btn-success btn-block"
									type="button"
									disabled={product.countInStock === 0}
								>
									В корзину
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default ProductScreen