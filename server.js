const express = require('express');
const app = express();
const http = require('http').createServer(app);


const PORT = process.env.PORT || 3000

http.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})
app.use(express.static(__dirname+'/public'))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})


// socket


const io = require('socket.io')(http)

const users = {};

io.on('connection',(socket)=>{
    console.log('connected...');
    socket.on('new-user-joined',names=>{
        console.log("new user",names);
        users[socket.id]=names;
        socket.broadcast.emit('user-joined',names);
        
    })
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message,names: users[socket.id]});
    })
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})
