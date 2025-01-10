document.addEventListener('DOMContentLoaded', (event) => {
    // Defining required constants and variable
    const messageArea = document.getElementById('chat-bot-message-area');
    const sendButton = document.getElementById('chat-bot-send');
    const fileInput = document.querySelector("#chat-bot-file-input");
    const fileInputBtn = document.querySelector("#chat-bot-file-input-btn");
    const chatBody = document.querySelector(".chat-bot-chat-body");
    const attachmentAlert = document.querySelector(".chat-bot-attachment-confirmed");
    const cancelAttachment = document.querySelector("#chat-bot-file-cancel-btn");
    const containerToggleUp = document.querySelector("#chat-bot-container-toggle-up");
    const containerToggleDown = document.querySelector("#chat-bot-container-toggle-down");
    var containerToggler = true;
    const userData = {
        message: null,
        file: {
            data: null,
            mimi_type: null
        }
    }

    //API setup
    const API_KEY = 'AIzaSyC5o5WDtts25fEGQdJzUSmQEnMghGNmpdQ';
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    //Used focus and blur to only show send button when the user clicks on the message area.
    messageArea.addEventListener('focus', () => {
        sendButton.style.display = 'block';
    });
    messageArea.addEventListener('blur', () => {
        if (messageArea.value.trim() === '') {
            sendButton.style.display = 'none';
        }
    });
    
    //Generate bot response and show error if any
    const generateBotResponse = async (incomingMessageDiv) =>{
        const messageElement = incomingMessageDiv.querySelector(".chat-bot-message-text");

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                contents: [{
                    parts: [{text: userData.message}, ...(userData.file.data ? [{inline_data: userData.file}] : [])]
                }]
            })
        }

        try{
            const response = await fetch(API_URL, requestOptions);
            const data = await response.json();
            if(!response.ok) throw new Error(data.error.message);
            
            const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
            messageElement.innerText = apiResponseText;
            userData.file.data = null;
           
        }catch(error){
            console.log(error);
            messageElement.innerText = error.message;
            messageElement.style.color = "#ff0000";
        }finally{
            incomingMessageDiv.classList.remove("chat-bot-thinking");
            chatBody.scrollTo({top: chatBody.scrollHeight, behavior:"smooth"});
        }
    };

    // Create div function for chat area
    const createMessageElement = (content, classes) => {
        const div = document.createElement("div");
        div.classList.add("chat-bot-message", classes);
        div.innerHTML = content;
        return div;
    };

    //Function to handle outgoing user messages in chat area
    const handleOutgoingMessage = () => {
        const messageContent = `
                                ${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" />` : ""}
                                <div class="chat-bot-message-text"></div>`;

        const outgoingMessageDiv = createMessageElement(messageContent, "chat-bot-user-message");
        outgoingMessageDiv.querySelector(".chat-bot-message-text").textContent = userData.message;
        chatBody.appendChild(outgoingMessageDiv);
        chatBody.scrollTo({top:chatBody.scrollHeight, behavior: "smooth"});

        //Function to show the thinking indicator dots
        setTimeout(() => {
            const messageContent = 
            ` <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
                        <path
                            d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z">
                        </path>
                    </svg>
                    <div class="chat-bot-message-text bot">
                       <div class="chat-bot-thinking-indicator">
                        <div class="chat-bot-dot"></div>
                       <div class="chat-bot-dot"></div>
                       <div class="chat-bot-dot"></div>
                       </div>
                    </div>`;
            const incomingMessageDiv = createMessageElement(messageContent, "chat-bot-bot-message", "chat-bot-thinking");
            chatBody.appendChild(incomingMessageDiv);
            generateBotResponse(incomingMessageDiv);
        },1000);
    };

    // Helper function for attachment case
    const attachmentHandler = () =>{
        fileInputBtn.style.display = "block";
        cancelAttachment.style.display = "none";
        attachmentAlert.textContent = "File uploaded successfully!";

    }

    // Event listeners for sending messages when either a user clicks on the send button or presses enter button
    sendButton.addEventListener('click', () =>{
        const userMessge = messageArea.value.trim();
        if(userMessge){
            userData.message = userMessge;
            handleOutgoingMessage();
            messageArea.value = '';
            attachmentHandler();
            document.body.classList.remove("show-emoji-picker");
        }
    });
    messageArea.addEventListener("keydown", (e) => {
        const userMessge = e.target.value.trim();
        if(e.key === 'Enter' && userMessge){
            userData.message = userMessge;
            handleOutgoingMessage();
            e.target.value = '';
            attachmentHandler();
            document.body.classList.remove("show-emoji-picker");
        }
    });

    // Handle file input change i.e. when an attachment is added
    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if(!file) return;
        attachmentAlert.textContent = "File uploaded successfully!";
        fileInputBtn.style.display = "none";
        cancelAttachment.style.display = "block";
        attachmentAlert.style.display = "block";
        setTimeout(() => {
            attachmentAlert.style.display = "none";
        }, 2000);
        const reader = new FileReader();
        reader.onload = (e) =>{
            const base64String = e.target.result.split(",")[1];

            userData.file = {
                data: base64String,
                mime_type: file.type
            }
            fileInput.value = "";
        }

        reader.readAsDataURL(file);
    });

    //Cancel attachment option 
    cancelAttachment.addEventListener("click", () => {
        userData.file = null;
        attachmentHandler();
        attachmentAlert.textContent = "File removed successfully!";
        attachmentAlert.style.display = "block";
        setTimeout(() => {
            attachmentAlert.style.display = "none";
        }, 2000);
    });

    // Integrating Emoji in message box section
    const picker = new EmojiMart.Picker({
       theme: "light",
       skinTonePosition: "none",
       prreviewPosition: "none" ,
       onEmojiSelect: (emoji) => {
        const {selectionStart : start, selectionEnd: end} = messageArea;
        messageArea.setRangeText(emoji.native, start, end, "end");
        messageArea.focus();
       },
       onClickOutside: (e) => {
        if(e.target.id === "chat-bot-emoji-picker"){
            document.body.classList.toggle("show-emoji-picker");
        } else{
            document.body.classList.remove("show-emoji-picker");
        }
       }
    });
    document.querySelector(".chat-bot-footer-container").appendChild(picker);

    fileInputBtn.addEventListener("click", () => fileInput.click());

    // Logic for toggling the chat bot up and down
    containerToggleUp.addEventListener("click", () =>{
        if(containerToggler){
            document.querySelector(".chat-bot-main-container").style.display = "flex";
            containerToggler = false;
            containerToggleUp.textContent = "cancel";
        }
        else if(containerToggler == false){
            containerToggler = true;
            document.querySelector(".chat-bot-main-container").style.display = "none";
            containerToggleUp.textContent = "forum";
        }
    });
    containerToggleDown.addEventListener("click", () =>{
        document.querySelector(".chat-bot-main-container").style.display = "none";
        containerToggleUp.textContent = "forum";
    });

});
