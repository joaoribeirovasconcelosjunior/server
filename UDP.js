const dgram = require('dgram'); //UDP
const { putVar, getVar } = require('@gd-com/utils'); //TCPUDP
const UDP = dgram.createSocket('udp4');

UDP.on('listening', () => {
  let address = UDP.address();
  console.log(`UDP Server listening on ${address.address}:${address.port}`);
});

UDP.on('message', (buf, remote) => {
    
  let buffer = new Buffer.from(buf);
  const recieve = getVar(buffer);
  var msg = JSON.parse(recieve.value);
  if (msg !== null){console.log('UDP ' , msg.callback);};
  

  let send = putVar(Math.random());
  UDP.send(send, remote.port, remote.host);
});

UDP.bind(9091, '127.0.0.1');