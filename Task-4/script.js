// ... (previous WebSocket setup code) 

const sendButton = document.getElementById('send-button');
const userInput = document.getElementById('user-input');
const chatWindow = document.getElementById('chat-window');

sendButton.addEventListener('click', () => {
    const message = userInput.value;
    socket.send(message);
    userInput.value = ''; // Clear the input field
});

socket.addEventListener('message', (event) => {
    const newMessage = document.createElement('div');
    newMessage.textContent = event.data;
    chatWindow.appendChild(newMessage);
});
