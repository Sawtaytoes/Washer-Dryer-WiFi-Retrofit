const ADD_PIN = 'PINS::ADD_PIN'

const addPin = ({
	flicClient,
	hostname,
}) => ({
	flicClient,
	hostname,
	type: ADD_PIN,
})

module.exports = {
	ADD_PIN,
	addPin,
}
