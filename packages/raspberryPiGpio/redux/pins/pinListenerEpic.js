const { bindNodeCallback } = require('rxjs')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { configurations } = require('@redux-observable-backend/node')
const { map, mergeMap, tap } = require('rxjs/operators')
const { Observable } = require('rxjs')
const { ofType } = require('redux-observable')

const { ADD_PIN } = require('./actions')
const { sendWebSocketMessage } = require('$redux/connections/actions')

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
			Observable
			.create((
				observer,
			) => {
				pin
				.watch((
					error,
					value,
				) => {
					error
					&& (
						observer
						.error(error)
					)

					observer
					.next(value)
				})
			})
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
