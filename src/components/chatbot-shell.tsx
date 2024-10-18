import { Show, createSignal, lazy } from "solid-js";

const Chatbot = lazy(() => import("./chatbot"));

export const ChatbotShell = () => {
  const [open, setOpen] = createSignal(false);

  return (
    <div>
      <Show when={open()}>
        <div class="chat-container">
          <div class="header">
            <h6 class="chat-name">Cody</h6>
            <button class="chat-close" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
          <Chatbot />
        </div>
      </Show>
      <Show when={!open()}>
        <button class="btn-open-chat" onClick={() => setOpen(true)}>
          Open
        </button>
      </Show>
    </div>
  );
};
