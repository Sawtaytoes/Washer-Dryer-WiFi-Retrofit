#!/usr/bin/env node
require('better-module-alias')(__dirname)

module.exports = {
	connections: require('$redux/connections').connections,
	pins: require('$redux/pins').pins,
}
