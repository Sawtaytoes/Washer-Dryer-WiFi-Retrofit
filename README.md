# Washer Dryer WiFi Retrofit
Raspberry Pi microservices for controlling a washer-dryer vibration sensors.

All of these microservices can be run independently, but the Flic software currently only targets those two controllers. If you want to have other device support, that would need to be added separately.

If you'd like to make your a controller for something I haven't covered, there's plenty of example code available in this project to get started.

## Table of Contents
- [Central Command](packages/central-command) - Microservice which accepts commands from various Raspberry Pis sending GPIO. This service should be customized for your use case.
- [Raspberry Pi GPIO](packages/raspberry-pi-gpio) - Microservice for sending GPIO data over WebSockets to the main controller microservice.
