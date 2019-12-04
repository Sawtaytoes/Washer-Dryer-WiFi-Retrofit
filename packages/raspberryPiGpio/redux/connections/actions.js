const GPIO_MESSAGE = 'CONNECTIONS::GPIO_MESSAGE'
const SEND_WEBSOCKET_MESSAGE = 'CONNECTIONS::SEND_WEBSOCKET_MESSAGE'

const sendWebSocketMessage = ({
	namespace,
	payload,
}) => ({
	namespace,
	payload,
	type: SEND_WEBSOCKET_MESSAGE,
})

module.exports = {
	GPIO_MESSAGE,
	SEND_WEBSOCKET_MESSAGE,
	sendWebSocketMessage,
}
