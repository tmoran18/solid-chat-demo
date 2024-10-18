import { For } from "solid-js";

type Message = { text: string; role: "user" | "bot" };

const messages: Message[] = [
  { role: "bot", text: "Howdy!" },
  { role: "user", text: "Howdy!" },
];

const Chatbot = () => {
  return (
    <div class="main">
      <div class="conversation">
        <For each={messages} fallback={<div>...</div>}>
          {(message) => (
            <div
              classList={{
                ["message-row"]: true,
                ["justify-start"]: message.role === "bot",
                ["justify-end"]: message.role === "user",
              }}
            >
              <div
                class={message.role === "bot" ? "bot-message" : "user-message"}
              >
                {message.text}
              </div>
            </div>
          )}
        </For>
      </div>
      <div class="chat-footer">
        <input placeholder="your message" />
        <button>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
