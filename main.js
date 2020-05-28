//cd /cygdrive/C/Users/joaor/Documents/Fire_Zone/Server: terminal diretory 
const net = require('net'); //TCP
const StreamTcp = require('./StreamTcp'); //TCP
const dgram = require('dgram'); //UDP
const { putVar, getVar } = require('@gd-com/utils'); //TCPUDP
const database_model = require('./models/database_model');
const UDP = dgram.createSocket('udp4');

database_model.connect(function(result){console.log("connect");});
database_model.start_table(function(result){});
//database_model.consult("email","hotmail", function(result){console.log('consult : ' , result);});
//database_model.login("root","root", function(result){console.log('login : ' , result);});
//database_model.rank( function(result){console.log('rank : ' , result);});
//database_model.create_account("xxxx","xxxx","xxxx","xxxx", function(result){console.log('create_account : ' , result);});


let TCP = net.createServer((socket) => {
    
    const tcpSplit = new StreamTcp();
    socket.pipe(tcpSplit).on('data', (data) => {
        
        const packet = new Buffer.from(data);
        const recieve = getVar(packet);
        var msg = JSON.parse(recieve.value);
        console.log('TCP ' , msg.callback);
        switch (msg.callback){
            
            case "login":
                console.log('TCP ' , msg.username);
                database_model.login(msg.username,msg.password, function(result){                    
                    const packetToSend = putVar(result);
                    const lengthBuffer = Buffer.alloc(4);
                    lengthBuffer.writeUInt32LE(packetToSend.length, 0);
                    const toSend = Buffer.concat([lengthBuffer, packetToSend]);
                    console.log('result : ' , toSend);
                    socket.write(toSend);                    
                });
            break;
            
            case "rank":               
                database_model.rank( function(result){
                    const packetToSend = putVar(result);
                    const lengthBuffer = Buffer.alloc(4);
                    lengthBuffer.writeUInt32LE(packetToSend.length, 0);
                    const toSend = Buffer.concat([lengthBuffer, packetToSend]);        
                    socket.write(toSend);                    
                });
            break;
            
            case "consult":
                database_model.consult(msg.item,msg.value, function(result){                
                    const packetToSend = putVar(result);
                    const lengthBuffer = Buffer.alloc(4);
                    lengthBuffer.writeUInt32LE(packetToSend.length, 0);
                    const toSend = Buffer.concat([lengthBuffer, packetToSend]);        
                    socket.write(toSend);                    
                });
            break;
            
            case "create_account":
                console.log(msg)
                database_model.consult(msg.email,msg.nickname,msg.username,msg.password, function(result){                
                    const packetToSend = putVar(result);
                    const lengthBuffer = Buffer.alloc(4);
                    lengthBuffer.writeUInt32LE(packetToSend.length, 0);
                    const toSend = Buffer.concat([lengthBuffer, packetToSend]);        
                    socket.write(toSend);                    
                });
            break;                        
        }
 

//        const packetToSend = putVar(Math.random());
//
//        // we need to put the packet length on top cause it's tcp
//        const lengthBuffer = Buffer.alloc(4);
//        lengthBuffer.writeUInt32LE(packetToSend.length, 0);
//        const toSend = Buffer.concat([lengthBuffer, packetToSend]);
//
//        
//        socket.write(toSend);
    });

    socket.on('error', () => console.log('Bye :('));
});

TCP.on('error', (err) => {
    
    throw err;
});

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

TCP.listen(9090, '127.0.0.1', () => {
  console.log(`Server launched TCP 127.0.0.1:${9090}`);
});

UDP.bind(9091, '127.0.0.1');