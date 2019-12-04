#/bin/bash
cd $( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

cd packages/raspberryPiGpio
pm2 start app.js -i 1 --name raspberryPiGpio
