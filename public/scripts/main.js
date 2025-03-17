const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");

const displayMessage = (sender, message) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    // Wrap the message in a <p> tag
    const messageParagraph = document.createElement('p');
    messageParagraph.innerText = message;
    // Append the <p> tag to the message element
    messageElement.appendChild(messageParagraph);
    chatLog.appendChild(messageElement);
}

const getChatbotResponse = (userMessage) => {
    // Make a request to your server with the user's message
    fetch('/getChatbotResponse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage }),
    })
        .then(response => response.json())
        .then(data => {
            // Display chatbot's response
            displayMessage('chatbot', data.chatbotResponse);
        })
        .catch(error => console.error('Error:', error));
}

const sendMessage = () => {
    const message = userInput.value;
    displayMessage("user", message);
    getChatbotResponse(message);
    userInput.value = "";
}