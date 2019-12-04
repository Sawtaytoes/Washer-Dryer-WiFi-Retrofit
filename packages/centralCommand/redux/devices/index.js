const { combineEpics } = require('redux-observable')

const requestsEpic = require('./requestsEpic')

const devicesEpic = (
	combineEpics(
		requestsEpic,
	)
)

module.exports = {
	devices: {
		actions: require('./actions'),
	},
	devicesEpic,
}
