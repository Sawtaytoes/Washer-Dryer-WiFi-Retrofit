const { combineEpics } = require('redux-observable')

const requestsEpic = require('./requestsEpic')
const sendEmailEpic = require('./sendEmailEpic')
const vibrationsEpic = require('./vibrationsEpic')

const devicesEpic = (
	combineEpics(
		requestsEpic,
		sendEmailEpic,
		vibrationsEpic,
	)
)

module.exports = {
	devices: {
		actions: require('./actions'),
	},
	devicesEpic,
}
