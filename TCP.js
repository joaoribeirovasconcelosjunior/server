const net = require('net'); //TCP
const StreamTcp = require('./StreamTcp'); //TCP
const { putVar, getVar } = require('@gd-com/utils'); //TCPUDP

let TCP = net.createServer((socket) => {
    
    const tcpSplit = new StreamTcp();
    socket.pipe(tcpSplit).on('data', (data) => {
        console.log('XXXXXXXXXX ' , socket);
        const packet = new Buffer.from(data);
        const recieve = getVar(packet);
        var msg = JSON.parse(recieve.value);
        console.log('TCP ' , msg.callback);
        
        switch (msg.callback){
            
            case "transform":
                
                //console.log('transform :',obj.value );
            break;
                        
        }
 

        const packetToSend = putVar(Math.random());

        // we need to put the packet length on top cause it's tcp
        const lengthBuffer = Buffer.alloc(4);
        lengthBuffer.writeUInt32LE(packetToSend.length, 0);
        const toSend = Buffer.concat([lengthBuffer, packetToSend]);

        
        socket.write(toSend);
    });

    socket.on('error', () => console.log('Bye :('));
});

TCP.on('error', (err) => {
    
    throw err;
});

TCP.listen(9090, '127.0.0.1', () => {
  console.log(`Server launched TCP 127.0.0.1:${9090}`);
});