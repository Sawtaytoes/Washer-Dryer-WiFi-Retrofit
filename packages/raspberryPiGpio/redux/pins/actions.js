const ADD_PIN = 'PINS::ADD_PIN'

const addPin = ({
	pin,
	pinName,
	pipelineOperator,
	serverName,
}) => ({
	pin,
	pinName,
	pipelineOperator,
	serverName,
	type: ADD_PIN,
})

module.exports = {
	ADD_PIN,
	addPin,
}
