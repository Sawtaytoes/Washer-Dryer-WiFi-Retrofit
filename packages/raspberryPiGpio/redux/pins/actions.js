const ADD_PIN = 'PINS::ADD_PIN'

const addPin = ({
	direction,
	edge,
	pin,
	pinName,
	pinNumber,
	serverName,
}) => ({
	direction,
	edge,
	pin,
	pinName,
	pinNumber,
	serverName,
	type: ADD_PIN,
})

module.exports = {
	ADD_PIN,
	addPin,
}
