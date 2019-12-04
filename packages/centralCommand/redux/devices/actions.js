const GPIO_MESSAGE = 'REQUEST::GPIO_MESSAGE'
const RECEIVED_GPIO_MESSAGE = 'DEVICES::RECEIVED_GPIO_MESSAGE'
const SEND_EMAIL = 'DEVICES::SEND_EMAIL'

const receivedGpioMessage = ({
	deviceName,
	pinName,
	value,
}) => ({
	deviceName,
	pinName,
	value,
	type: RECEIVED_GPIO_MESSAGE,
})

const sendEmail = (
	email,
) => ({
	email,
	type: SEND_EMAIL,
})

module.exports = {
	GPIO_MESSAGE,
	RECEIVED_GPIO_MESSAGE,
	receivedGpioMessage,
	SEND_EMAIL,
	sendEmail,
}
