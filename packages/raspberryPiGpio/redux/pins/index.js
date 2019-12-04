const { combineEpics } = require('redux-observable')

const addPinsEpic = require('./addPinsEpic')
const pinListenerEpic = require('./pinListenerEpic')
const sigIntEpic = require('./sigIntEpic')

const pinsEpic = (
	combineEpics(
		addPinsEpic,
		pinListenerEpic,
		sigIntEpic,
	)
)

module.exports = {
	pins: {
		actions: require('./actions'),
	},
	pinsEpic,
}
