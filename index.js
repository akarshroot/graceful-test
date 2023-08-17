const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log('[GET] /')
  res.send('Hello from graceful server!');
})

app.get('/health-check', async (req, res) => {
  console.log('health check started');
  const data = await new Promise((res, rej) => {
    setTimeout(()=>{
      res(true);
    }, 20000)
  })
  res.send('success')
})

const server = app.listen(3000, () => {
  console.log('listening...');
})
let shuttingDown = false;
  function gracefulExit(server) {
    if (shuttingDown) return
    shuttingDown = true
    console.log('Received kill signal (SIGTERM), shutting down')

    setTimeout(function() {
      console.log(
        'Could not close connections in time, forcefully shutting down'
      )
      process.exit(1)
    }, 30000).unref()

    server.close(function() {
      console.log('Closed out remaining connections.')
      process.exit()
    })
  }

process.on('SIGINT', () => {
  gracefulExit('SIGINT', server);
})

process.on('SIGTERM', () => {
  gracefulExit(server);
})
