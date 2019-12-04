const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')
const { webSocketsEpic, webSocketsReducers } = require('@redux-observable-backend/websocket')

const { connectionsEpic } = require('./connections')
const { pinsEpic } = require('./pins')

const rootEpic = (
	combineEpics(
		connectionsEpic,
		pinsEpic,
		webSocketsEpic,
	)
)

const rootReducers = {
	...webSocketsReducers,
}

const rootReducer = (
	combineReducers(
		rootReducers,
	)
)

module.exports = {
	rootEpic,
	rootReducers,
	rootReducer,
}
