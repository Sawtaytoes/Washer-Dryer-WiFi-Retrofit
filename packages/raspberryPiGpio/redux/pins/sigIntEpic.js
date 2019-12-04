const { bindNodeCallback } = require('rxjs')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { ignoreElements, mergeMap, tap } = require('rxjs/operators')
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
			bindNodeCallback(
				process
				.on
				.bind(process)
			)()
			.pipe(
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
