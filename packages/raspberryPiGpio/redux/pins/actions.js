const ADD_PIN = 'PINS::ADD_PIN'

const addPin = ({
	direction,
	edge,
	options,
	pin,
	pinName,
	pinNumber,
	serverName,
}) => ({
	direction,
	edge,
	options,
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
