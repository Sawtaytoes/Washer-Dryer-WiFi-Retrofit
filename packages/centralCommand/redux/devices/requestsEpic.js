const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { combineEpics } = require('redux-observable')
const { ignoreElements, map, pluck, tap } = require('rxjs/operators')
const { ofRequestType } = require('@redux-observable-backend/websocket')

const {
	GPIO_MESSAGE,
} = require('./actions')

const onGpioMessage = (
	action$,
) => (
	action$
	.pipe(
		ofRequestType(GPIO_MESSAGE),
		// pluck('names'),
		// map(turnOnDevices),
		tap(console.log),
		ignoreElements(),
		catchEpicError(),
	)
)

const requestsEpic = (
	combineEpics(
		onGpioMessage,
	)
)

module.exports = requestsEpic
