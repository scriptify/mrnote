const pm2 = require('pm2');

const onError = err => {
  if (err) {
    console.error(err);
    process.exit(2);
  }
};

pm2.connect(err => {
  onError(err);

  pm2.list((err, list) => {
    console.log('list');
    onError(err);
    const pList = list.filter(p => p.name === 'api-server');

    if(pList.length > 0) {
      console.log(pList[0].status);
      if(pList[0].status === 'running') {
        pm2.stop(pList[0], onError);
      }
      pm2.start(pList[0], onError);
    } else {
      console.log('start');
      pm2.start({
        script: 'server/index.js',         // Script to be run
        name: 'api-server'
      }, function(err, apps) {
        pm2.disconnect();   // Disconnect from PM2
        onError(err);
      });

    }
  });
})
