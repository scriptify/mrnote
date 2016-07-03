#!/bin/bash
cd ..
DESCR=CMD=`pm2 describe index 2>&1`

if [[ $DESCR != *"WARN"* ]]
then
  pm2 stop index
fi

webpack
pm2 start server/index.js
