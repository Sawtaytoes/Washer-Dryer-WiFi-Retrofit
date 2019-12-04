const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { configurations, ofTaskName, tasks } = require('@redux-observable-backend/node')
const { Gpio } = require('onoff')
const { map, mergeMap } = require('rxjs/operators')
const { ofType } = require('redux-observable')

const { addPin } = require('./actions')

const addPinsEpic = (
	action$,
	state$,
) => (
	action$
	.pipe(
		ofType(
			tasks
			.actions
			.START_TASK
		),
		ofTaskName(
			'listen',
			'undefined',
		),
		map(() => state$.value),
		map(
			configurations
			.selectors
			.selectConfigurationSet()
		),
		mergeMap(({ pins }) => (
			pins
		)),
		map(({
			direction,
			edge,
			pinNumber,
			...rest
		}) => ({
			...rest,
			direction,
			edge,
			pin: (
				new Gpio(
					pinNumber,
					direction,
					edge,
				)
			),
			pinNumber,
		})),
		map(addPin),
		catchEpicError(),
	)
)

module.exports = addPinsEpic
