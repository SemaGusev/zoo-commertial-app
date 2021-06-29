import bcrypt from 'bcryptjs'

const users = [
	{
		name: 'Admin User',
		email: 'admin@example.com',
		phoneNumber: +375251232323,
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'John Doe',
		email: 'john@example.com',
		phoneNumber: +375259222934,
		password: bcrypt.hashSync('123456', 10),
	},
	{
		name: 'Jane Doe',
		email: 'Jane@example.com',
		phoneNumber: +375333333333,
		password: bcrypt.hashSync('123456', 10),
	},
]

export default users
