console.log('hello')
const socket = io()
const form = document.getElementById('sendContainer');
const messageInput = document.getElementById('messageInput')
const messageContainer=document.querySelector('.container')
var audio = new Audio('ting.mp3');
const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value =''
})
let names;
do {
    names = prompt("please enter your name")
} while (!names);
socket.emit('new-user-joined',names);
socket.on('user-joined',names=>{
    append(`${names} joined the chat`,'left')
})
socket.on('receive',data=>{
    append(`${data.names}: ${data.message}`,'left')
})
socket.on('left',names=>{
    append(`${names} left the chat`,'left');
})