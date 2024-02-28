const WebSocket = require('ws');
const openai = require('openai');

openai.apiKey = "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"; // Replace with your actual key

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message', (message) => {
        openai.createCompletion({
            model: "text-davinci-003", // Adjust the model if needed
            prompt: message,
            max_tokens: 100,  // Limit response length
            temperature: 0.7  // Controls creativity of responses
        }).then(response => {
            socket.send(response.choices[0].text.trim());
        }).catch(error => {
            console.error("Error communicating with ChatGPT: ", error);
            socket.send("Oops, I had trouble getting a response. Try again?");
        });
    });
});
