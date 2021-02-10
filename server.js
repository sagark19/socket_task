const http = require('http').createServer();
const io = require('socket.io')(http);
const port = 3000;

var users =[];

io.on('connection', (socket) => {
    socket.on("login",(username) => {
        console.log(`${username} is connected`)
        let user = {
            'username' : username,
            'id' : socket.id,
            'amount': 0,
        }
        users.push(user);
        socket.emit('message',`Heloo ${username}, Logged In!`)
    })
    socket.on("operation",(data) => {
        if(data === 'balance_check'){
            let user = users.find( a => a.id === socket.id)
            socket.emit('message',user.amount)
            
        } else if(data.operation === 'deposit'){
            users.find(a => {
                if(a.id === socket.id) {
                    a.amount += parseInt(data.amount)
                    socket.emit('message',a.amount)
                }
            })
        }else if(data.operation === 'withdraw'){
            users.find(a => {
                if(a.id === socket.id) {
                    a.amount -= parseInt(data.amount)
                    socket.emit('message',a.amount)
                }
            })
        }
    })

})


http.listen(port, () => console.log(`server listening on port: ${port}`))
