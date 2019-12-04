const { bindNodeCallback } = require('rxjs')
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
					bindNodeCallback(
						process
						.on
						.bind(process)
					)(
						'beforeExit'
					)
				),
				(
					bindNodeCallback(
						process
						.on
						.bind(process)
					)(
						'SIGINT'
					)
				),
				(
					bindNodeCallback(
						process
						.on
						.bind(process)
					)(
						'SIGTERM'
					)
				),
				(
					bindNodeCallback(
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
