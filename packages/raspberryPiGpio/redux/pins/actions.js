const ADD_PIN = 'PINS::ADD_PIN'

const addPin = ({
	direction,
	edge,
	pin,
	pinName,
	pinNumber,
	pipelineOperator,
	serverName,
}) => ({
	direction,
	edge,
	pin,
	pinName,
	pinNumber,
	pipelineOperator,
	serverName,
	type: ADD_PIN,
})

module.exports = {
	ADD_PIN,
	addPin,
}
