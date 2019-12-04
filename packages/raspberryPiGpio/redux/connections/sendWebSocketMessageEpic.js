const chalk = require('chalk')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { externalConnections } = require('@redux-observable-backend/websocket')
const { catchError, filter, ignoreElements, map, mapTo, mergeMap, tap } = require('rxjs/operators')
const { of } = require('rxjs')
const { ofType } = require('redux-observable')

const { GPIO_MESSAGE, SEND_WEBSOCKET_MESSAGE } = require('./actions')

const sendWebSocketMessageEpic = (
	action$,
	state$,
) => (
	action$
	.pipe(
		ofType(SEND_WEBSOCKET_MESSAGE),
		mergeMap(({
			namespace,
			payload,
		}) => (
			of(state$.value)
			.pipe(
				map(
					externalConnections
					.selectors
					.selectExternalConnection({
						namespace: namespace,
					})
				),
				filter(Boolean),
				tap(connection => (
					connection
					.next({
						payload,
						type: GPIO_MESSAGE,
					})
				)),
				mapTo({}),
				catchError(error => (
					of({ error })
				)),
				tap(({
					error,
				}) => {
					console
					.info(
						(
							error
							? (
								chalk
								.red(
									"❌ Failed to send payload:"
								)
							)
							: (
								chalk
								.green(
									"✔️ Successfully send payload:"
								)
							)
						),
						(
							'\n'
						),
						({
							namespace,
							payload,
						}),
					)
				}),
			)
		)),
		catchEpicError(),
		ignoreElements(),
	)
)

module.exports = sendWebSocketMessageEpic
