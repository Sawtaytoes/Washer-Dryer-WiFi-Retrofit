const { bindCallback } = require('rxjs')
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
					bindCallback(
						process
						.on
						.bind(process)
					)(
						'beforeExit'
					)
				),
				(
					bindCallback(
						process
						.on
						.bind(process)
					)(
						'SIGINT'
					)
				),
				(
					bindCallback(
						process
						.on
						.bind(process)
					)(
						'SIGTERM'
					)
				),
				(
					bindCallback(
						process
						.on
						.bind(process)
					)(
						'SIGUSR2'
					)
				),
			)
			.pipe(
				take(1),
				tap(() => {
					pin
					.unexport()
				})
			)
		)),
		ignoreElements(),
		catchEpicError(),
	)
)

module.exports = sigIntEpic
