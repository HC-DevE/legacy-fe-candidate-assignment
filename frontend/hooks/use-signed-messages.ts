"use client";

import { useMessageStore } from "@/store/message.store";

export function useSignedMessages() {
  const messages = useMessageStore((state) => state.messages);
  const addMessage = useMessageStore((state) => state.addMessage);
  const removeMessage = useMessageStore((state) => state.removeMessage);
  const clearMessages = useMessageStore((state) => state.clearMessages);

  return {
    messages,
    addMessage,
    removeMessage,
    clearMessages,
  };
}
