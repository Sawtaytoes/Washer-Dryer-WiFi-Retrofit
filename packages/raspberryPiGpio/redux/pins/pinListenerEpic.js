const { bindNodeCallback } = require('rxjs')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { configurations } = require('@redux-observable-backend/node')
const { map, mergeMap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const { ADD_PIN } = require('./actions')
const { sendWebSocketMessage } = require('$redux/connecitons/actions')

const pinListenerEpic = (
	action$,
	state$,
) => (
	action$
	.pipe(
		ofType(ADD_PIN),
		mergeMap(({
			pin,
			pinName,
			serverName,
		}) => (
			bindNodeCallback(
				pin
				.watch
				.bind(pin)
			)()
			.pipe(
				map((
					value,
				) => ({
					deviceName: (
						configurations
						.selectors
						.selectConfigurationSet()(
							state$
							.value
						)
						.deviceName
					),
					namespace: serverName,
					payload: {
						pinName,
						value,
					},
				})),
			)
		)),
		map(sendWebSocketMessage),
		catchEpicError(),
	)
)

module.exports = pinListenerEpic
