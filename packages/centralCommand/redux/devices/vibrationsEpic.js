const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { configurations } = require('@redux-observable-backend/node')
const { filter, map, mergeMap, pluck, takeUntil, tap } = require('rxjs/operators')
const { ofType } = require('redux-observable')
const { timer } = require('rxjs')

const { RECEIVED_GPIO_MESSAGE, sendEmail } = require('./actions')

const vibrationsEpic = (
	action$,
	state$,
) => (
	action$
	.pipe(
		ofType(RECEIVED_GPIO_MESSAGE),
		mergeMap(({
			deviceName,
			pinName,
		}) => (
			timer(60 * 1000) // 1 minute
			.pipe(
				takeUntil(
					action$
					.pipe(
						ofType(RECEIVED_GPIO_MESSAGE),
						filter((
							action,
						) => (
							action.deviceName === deviceName
						)),
						filter((
							action,
						) => (
							action.pinName === pinName
						)),
					)
				),
				map(() => state$.value),
				map(
					configurations
					.selectors
					.selectConfigurationSet()
				),
				pluck('mailOptions'),
				map(({
					from,
					to,
				}) => ({
					from,
					to,
					subject: `${pinName} is done.`,
					text: `Completed on: ${Date()}`,
				})),
				tap(() => {
					console
					.info(
						'[SENDING EMAIL]',
						deviceName,
						pinName,
						`(${Date()})`,
					)
				}),
				map(sendEmail),
			)
		)),
		catchEpicError(),
	)
)

module.exports = vibrationsEpic
