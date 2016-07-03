#!/bin/bash
cd ..
DESCR=CMD=`pm2 describe index 2>&1`

if [[ $DESCR != *"WARN"* ]]
then
  pm2 stop index
fi

pm2 start server/index.js
webpack-dev-server
