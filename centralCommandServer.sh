#/bin/bash
cd $( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

cd packages/centralCommand
pm2 start app.js -i 1 --name centralCommand
