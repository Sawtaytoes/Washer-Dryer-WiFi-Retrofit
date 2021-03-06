// Include this import before other local imports.
require('better-module-alias')(__dirname)

const { applyMiddleware, createStore } = require('redux')
const { createActionLoggerMiddleware } = require('@redux-observable-backend/redux-utils')
const { createConfigurationSet, runTasks } = require('@redux-observable-backend/node')
const { createEpicMiddleware } = require('redux-observable')
const { of } = require('rxjs')
const { tap } = require('rxjs/operators')

const {
	rootEpic,
	rootReducer,
} = require('$redux')

require('./')

const actionLoggerMiddleware = (
	createActionLoggerMiddleware()
)

const epicMiddleware = (
	createEpicMiddleware()
)

const middleware = (
	applyMiddleware(
		actionLoggerMiddleware,
		epicMiddleware
	)
)

const store = (
	createStore(
		rootReducer,
		middleware,
	)
)

epicMiddleware
.run(rootEpic)

of(store)
.pipe(
	tap(createConfigurationSet({})),
	tap(
		runTasks(
			'lint',
			'connect',
			'listen',
		)
	),
)
.subscribe()
