const { isNumber } = require('util');

var socket = require('socket.io-client')('http://localhost:3000');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  readline.on('line', (input) => {
    let data = input.split(' ')
    if(data[0] === 'username'){
      socket.emit('login', data[1] );
    }else if(data[0] === 'balance_check'){
      socket.emit('operation',data[0])
    }else if(data[0] === 'deposit'){
      socket.emit('operation',{operation:data[0],amount :data[1]})
    }
    else if(data[0] === 'withdraw'){
      socket.emit('operation',{operation:data[0],amount :data[1]})
    }else {
      console.log('please enter valid data')
    }
  });
 
  socket.on('message',(dt) => {
        console.log(dt)
  })