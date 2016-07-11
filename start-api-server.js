const pm2 = require('pm2');

const scriptName = 'api-server';
const onError = err => {
  if (err) {
    console.error(err);
    process.exit(2);
  }
};

pm2.connect(err => {


  onError(err);

  pm2.list((err, list) => {

    onError(err);
    const pList = list.filter(p => p.name === scriptName);

    if(pList.length > 0) {

      if(pList[0].pm2_env.status === 'online') {

        pm2.stop(scriptName, err => {
          onError(err);
          pm2.start(scriptName, err => {
            onError(err);
            pm2.disconnect();
          });
        });
      } else {

        pm2.start(scriptName, err => {
          onError(err);
          pm2.disconnect();
        });
      }



    } else {

      pm2.start({
        script: './server/index.js',         // Script to be run
        name: 'api-server'
      }, function(err, apps) {
        onError(err);
        pm2.disconnect();   // Disconnect from PM2
      });

    }
  });
})
