const { fromEvent } = require('rxjs')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { ignoreElements, mergeMap, take, tap } = require('rxjs/operators')
const { merge } = require('rxjs')
const { ofType } = require('redux-observable')

const { ADD_PIN } = require('./actions')

const sigIntEpic = (
	action$,
) => (
	action$
	.pipe(
		ofType(ADD_PIN),
		mergeMap(({
			pin,
		}) => (
			merge(
				(
					fromEvent(
						process,
						'beforeExit',
					)
				),
				(
					fromEvent(
						process,
						'SIGINT',
					)
				),
				(
					fromEvent(
						process,
						'SIGTERM',
					)
				),
				(
					fromEvent(
						process,
						'SIGUSR2',
					)
					.pipe(
						tap(() => {
							process
							.exit()
						})
					)
				),
			)
			.pipe(
				take(1),
				tap(() => {
					console.log(pin)

					pin
					&& (
						pin
						.unexport()
					)
				}),
			)
		)),
		ignoreElements(),
		catchEpicError(),
	)
)

module.exports = sigIntEpic
