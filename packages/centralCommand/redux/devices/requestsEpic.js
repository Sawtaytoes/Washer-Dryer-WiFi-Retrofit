const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { combineEpics } = require('redux-observable')
const { map, pluck } = require('rxjs/operators')
const { ofRequestType } = require('@redux-observable-backend/websocket')

const { GPIO_MESSAGE, receivedGpioMessage } = require('./actions')

const onGpioMessage = (
	action$,
) => (
	action$
	.pipe(
		ofRequestType(GPIO_MESSAGE),
		pluck('payload'),
		map(receivedGpioMessage),
		catchEpicError(),
	)
)

const requestsEpic = (
	combineEpics(
		onGpioMessage,
	)
)

module.exports = requestsEpic
