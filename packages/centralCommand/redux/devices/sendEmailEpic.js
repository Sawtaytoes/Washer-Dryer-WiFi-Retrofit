const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const { bindNodeCallback, of } = require('rxjs')
const { catchEpicError } = require('@redux-observable-backend/redux-utils')
const { catchError, ignoreElements, map, mergeMap, switchMap, tap } = require('rxjs/operators')
const { configurations } = require('@redux-observable-backend/node')
const { ofType } = require('redux-observable')

const { SEND_EMAIL } = require('./actions')

const sendEmailEpic = (
	action$,
	state$,
) => (
	action$
	.pipe(
		ofType(SEND_EMAIL),
		mergeMap(({
			email,
		}) => (
			of(
				state$
				.value
			)
			.pipe(
				map(
					configurations
					.selectors
					.selectConfigurationSet()
				),
				map(({
					smtpCredentials,
				}) => (
					nodemailer
					.createTransport(
						smtpTransport(
							smtpCredentials
						)
					)
				)),
				switchMap((
					smtpTransporter,
				) => (
					bindNodeCallback(
						smtpTransporter
						.sendMail
						.bind(smtpTransporter)
					)(
						email,
					)
					.pipe(
						tap(() => {
							console
							.info(
								'[SENT EMAIL]',
								email,
							)
						}),
						catchError((
							error,
						) => {
							console
							.info(
								'[FAILED SENDING EMAIL]',
								email,
								error,
							)

							return of(null)
						}),
						tap(() => {
							smtpTransporter
							.close()
						}),
					)
				)),
			)
		)),
		ignoreElements(),
		catchEpicError(),
	)
)

module.exports = sendEmailEpic
