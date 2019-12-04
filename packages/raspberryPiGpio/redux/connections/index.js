const { combineEpics } = require('redux-observable')

const connectToServersEpic = require('./connectToServersEpic')
const sendWebSocketMessageEpic = require('./sendWebSocketMessageEpic')

const connectionsEpic = (
	combineEpics(
		connectToServersEpic,
		sendWebSocketMessageEpic,
	)
)

module.exports = {
	connectionsEpic,
}
