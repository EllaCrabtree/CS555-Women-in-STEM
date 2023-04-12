(function() {
const sendBtn = document.querySelector('#send');
const messages = document.querySelector('#messages');
const messageBox = document.querySelector('#messageBox');

let ws;
let sender;

function showMessage(message, sender) {
    let target = undefined;
    if(sender)
    {
        target = document.getElementById("messages");
        target.innerHTML += "<p class=\"sender\" style=\"overflow-wrap: break-text;\">" + `${message}` + "</p>";
    }
    else
    {
        target = document.getElementById("messages");
        target.innerHTML += "<p class=\"receiver\">" + `${message}` + "</p>";
    }
    messages.scrollTop = messages.scrollHeight;
    messageBox.value = '';
}

function init() {
    if (ws) {
        ws.onerror = ws.onopen = ws.onclose = null;
        ws.close();
    }

    ws = new WebSocket('ws://localhost:6969');
    ws.onopen = () => {
        console.log('Connection opened!');
    }
    ws.onmessage = ({ data }) => showMessage(data, false);
    ws.onclose = function() {
        ws = null;
    }
}

document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;
    // Alert the key name and key code on keydown
    if(name === "Enter")
    {
        if (!ws) {
            showMessage("No WebSocket connection :(", false);
            return ;
        }
        if(messageBox.value.trim() !== "")
        {
            ws.send(messageBox.value);
            showMessage(messageBox.value, true);
        }
    }
  }, false);

sendBtn.onclick = function() {
    if (!ws) {
        showMessage("No WebSocket connection :(", false);
        return ;
    }

    if(messageBox.value.trim() !== "")
    {
        ws.send(messageBox.value);
        showMessage(messageBox.value, true);
    }
}

init();
})();