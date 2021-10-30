const socket = io('/')

const chat = document.querySelector('.chat-form');
const Input = document.querySelector('.chat-input')

socket.emit('join-room', {roomId: ROOM_ID});