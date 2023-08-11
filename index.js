const express = require('express');
const app = express();

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

function closeGracefully(signal, server) {
  console.log(`Got ${signal}, initializing graceful shutdown!`);
  server.close(() => {
    console.log('Server is gracefully terminated');
  });
}

process.on('SIGINT', () => {
  closeGracefully('SIGINT', server);
})

process.on('SIGTERM', () => {
  closeGracefully('SIGTERM', server);
})