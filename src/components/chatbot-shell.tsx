import { Show, createSignal, lazy } from "solid-js";

const Chatbot = lazy(() => import("./chatbot"));

export type Message = { text: string; role: "user" | "bot" };

export const ChatbotShell = () => {
  const [open, setOpen] = createSignal(false);
  // Store user session state here so it doesn't reset on open/close
  const [messages, setMessages] = createSignal<Message[]>([
    { role: "bot", text: "Howdy from USA!" },
  ]);

  return (
    <div>
      <Show when={open()}>
        <div class="chat-container">
          <div class="header">
            <h6 class="chat-name">Cody</h6>
            <button id="chat-close" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
          <Chatbot messages={messages} setMessages={setMessages} />
        </div>
      </Show>
      <Show when={!open()}>
        <button id="chat-open" onClick={() => setOpen(true)}>
          Open
        </button>
      </Show>
    </div>
  );
};
