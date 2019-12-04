const { combineEpics } = require('redux-observable')

const addPinsEpic = require('./addPinsEpic')
const onExitEpic = require('./onExitEpic')
const pinListenerEpic = require('./pinListenerEpic')

const pinsEpic = (
	combineEpics(
		addPinsEpic,
		onExitEpic,
		pinListenerEpic,
	)
)

module.exports = {
	pins: {
		actions: require('./actions'),
	},
	pinsEpic,
}
