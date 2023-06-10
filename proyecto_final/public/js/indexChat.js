const socket = io();

let email = "";

async function welcomeMessage() {
  const { value: userEmail } = await Swal.fire({
    title: "Enter email",
    input: "text",
    inputLabel: "email",
    inputValue: "",
    showCancelButton: false,
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) {
        return "Complete before using chat";
      }
    },
  });
  email = userEmail;
}

welcomeMessage();

const message = document.getElementById("message-input");

message.addEventListener("keyup", ({ key }) => {
  if (key == "Enter") {
    socket.emit("msg_front_to_back", {
      message: message.value,
      user: email,
    });
    message.value = "";
  }
});

socket.on("all_messages", (messages) => {
  renderMessages(messages);
});

function renderMessages(messagesToRender) {
  const messages = document.getElementById("messages");
  let updatedMessages = "";
  messagesToRender.forEach((msg) => {
    updatedMessages = updatedMessages + `<p>${msg.user}: ${msg.message}</p>`;
  });
  messages.innerHTML = updatedMessages;

  messages.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
}
