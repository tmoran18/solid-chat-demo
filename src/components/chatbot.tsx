import { For, Show, createSignal, type Accessor, type Setter } from "solid-js";
import type { Message } from "./chatbot-shell";
import { greetings } from "../utils/constants";

const PendingMessage = () => {
  return (
    <div class="message-row justify-start">
      <div class="bot-message">...</div>
    </div>
  );
};

const Chatbot = ({
  messages,
  setMessages,
}: {
  messages: Accessor<Message[]>;
  setMessages: Setter<Message[]>;
}) => {
  let conversationRef: HTMLDivElement | undefined;
  const [input, setInput] = createSignal("");
  const [botIsTyping, setBotIsTyping] = createSignal(false);

  const addMessage = (text: string, role: "user" | "bot") => {
    setMessages([...messages(), { text, role }]);
  };

  const sendMessage = () => {
    const userMessage = input();
    if (userMessage.trim()) {
      addMessage(userMessage, "user");
      if (conversationRef) {
        conversationRef.scrollTop = conversationRef.scrollHeight;
      }
      // Reply with a random greeting after 0.5 seconds
      setBotIsTyping(true);
      setTimeout(() => {
        const randomGreeting =
          greetings[Math.floor(Math.random() * greetings.length)];
        addMessage(randomGreeting, "bot");
        setBotIsTyping(false);
      }, 500);
    }
    setInput("");
  };

  const messageList = () => [...messages()].reverse();

  return (
    <div class="main">
      <div class="conversation">
        <div class="messages" ref={conversationRef}>
          <Show when={botIsTyping()}>
            <PendingMessage />
          </Show>
          <For each={messageList()} fallback={<PendingMessage />}>
            {(message) => (
              <div
                class={`message-row ${
                  message.role == "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  class={
                    message.role === "bot" ? "bot-message" : "user-message"
                  }
                >
                  {message.text}
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
      <div class="chat-footer">
        <input
          id="messageInput"
          placeholder="your message"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input()}
        />
        <button onClick={sendMessage} disabled={botIsTyping()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
