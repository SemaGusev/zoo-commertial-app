import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<header>
			<Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>AnimalPlanet.by</Navbar.Brand>
					</LinkContainer>
					<div>
						<img
							alt=""
							id="headerIcon"
							style={headerIcon}
							src="https://image.flaticon.com/icons/png/512/489/489399.png"
						/>
						<img
							alt=""
							id="headerIcon"
							style={headerIcon}
							src="https://image.flaticon.com/icons/png/512/1598/1598196.png"
						/>
						<img
							alt=""
							id="headerIcon"
							style={headerIcon}
							src="https://image.flaticon.com/icons/png/512/2954/2954418.png"
						/>
					</div>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<LinkContainer to="/products">
								<Nav.Link>
									<i className="fas fa-box-open"></i> Товары
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/contacts">
								<Nav.Link>
									<i className="fas fa-phone"></i> Контакты
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/login">
								<Nav.Link>
									<i className="fas fa-user"></i> Регистрация
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/cart">
								<Nav.Link>
									<i className="fas fa-shopping-basket"></i> Корзина
								</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

const headerIcon = {
	width: '38px',
	height: '38px',
}

export default Header
