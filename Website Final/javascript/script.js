const base_url1 = "https://db1087.brighton.domains/gp/api.php";
const option1 = "cb_tag";

function fetchingchatbot(tag){
    const url1 = `${base_url1}?option=${option1}&tags=${tag}`;

    return fetch(url1)
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
        throw new Error(`Request failed with status code: ${response.status}`);
        }})
        .then(data => {
            console.log(data);
            if (data.results) {
                let game1 = data.results[0].title;
                let game2 = data.results[1].title;
                let game3 = data.results[2].title;
                console.log("The top 3 games labelled with the " + tag + " tag are: " + game1 + ", " + game2 + " and " + game3);
                let message = "The top 3 games labelled with the " + tag + " tag are: " + game1 + ", " + game2 + " and " + game3;
                return message;
            }
            
            
            
        })
        .catch(error => {
            console.error(error);
        });
    
}

function getBotResponse(input) {
  if (input === "hello") {
    return "Hello there!";
  } else if (input === "goodbye") {
    return "Talk to you later!";
  }

  if (input.includes("sport")) {
    return fetchingchatbot("sport");
  } else if (input.includes("action")) {
    return fetchingchatbot("action");
  } else if (input.includes("shooter")) {
    return fetchingchatbot("shooter");
  } else if (input.includes("open world")) {
    return fetchingchatbot("open world");
  } else if (input.includes("story")) {
    return fetchingchatbot("story");
  } else if (input.includes("sci-fi")) {
    return fetchingchatbot("sci fi");
  } else if (input.includes("entertainment")) {
    return fetchingchatbot("entertainment");
  } else if (input.includes("driving")) {
    return fetchingchatbot("driving");
  } else if (input.includes("multiplayer")) {
    return fetchingchatbot("multiplayer");
  } else if (input.includes("adventure")) {
    return fetchingchatbot("adventure");
  } else if (input.includes("strategy")) {
    return fetchingchatbot("strategy");
  } else if (input.includes("online")) {
    return fetchingchatbot("online");
  } else if (input.includes("fighting")) {
    return fetchingchatbot("fighting");
  } else if (input.includes("first person")) {
    return fetchingchatbot("first person");
  } else if (input.includes("third person")) {
    return fetchingchatbot("third person");
  } else if (input.includes("stealth")) {
    return fetchingchatbot("stealth");
  } else if (input.includes("horror")) {
    return fetchingchatbot("horror");
  } else if (input.includes("role playing")) {
    return fetchingchatbot("role playing");
  } 

  return "I'm sorry, I didn't understand that.";
}
let chatBoxVisible = false;

function toggleChatBox() {
  const chatBox = document.getElementById("chatBox");
  chatBox.style.display = chatBoxVisible ? "none" : "block";
  chatBoxVisible = !chatBoxVisible;

  if (chatBoxVisible) {
    const chatMessages = document.getElementById("chatMessages");
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

function sanitizeInput(input) {
  // Remove HTML tags, preserving spaces
  const sanitizedInput = input.replace(/<(?!\/?\s*)([^>\s]+)(\s[^>]+)?(>|$)/gi, '');

  return sanitizedInput;
}

function sendMessage() {
  const userInput = document.getElementById("userInput");
  const chatMessages = document.getElementById("chatMessages");
  const message = sanitizeInput(userInput.value.trim());

  if (message !== "") {
    appendUserMessage(message);
    userInput.value = "";

    const botResponse = getBotResponse(message);
    if (typeof botResponse === "string") {
      // If the response is a string, it's a regular bot message
      appendBotMessage(botResponse);
    } else if (botResponse instanceof Promise) {
      // If the response is a Promise, it's the result of fetching game data
      appendBotMessage("Fetching game data..."); // Display loading message

      botResponse
        .then(response => {
          appendBotMessage(response); // Display the fetched game data
        })
        .catch(error => {
          appendBotMessage("An error occurred while fetching game data."); // Display error message
          console.error(error);
        });
    }
  }
}


function appendUserMessage(message) {
  const chatMessages = document.getElementById("chatMessages");
  const userMessage = createMessageElement("user", message);
  chatMessages.appendChild(userMessage);
  scrollToBottom(chatMessages);
}

function appendBotMessage(message) {
  const chatMessages = document.getElementById("chatMessages");
  const botMessage = createMessageElement("bot", message);
  chatMessages.appendChild(botMessage);
  scrollToBottom(chatMessages);
}

function createMessageElement(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.classList.add(sender === "user" ? "user-message" : "bot-message");

  const time = getCurrentTime(); // Get current time
  const content = `<span class="message-text">${message}</span><span class="message-time">${time}</span>`;
  messageElement.innerHTML = content;

  return messageElement;
}

function scrollToBottom(element) {
  element.scrollTop = element.scrollHeight;
}

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

// Display a welcome message when the chatbot is loaded
window.onload = function() {
  appendBotMessage("Welcome! How can I assist you?");
};