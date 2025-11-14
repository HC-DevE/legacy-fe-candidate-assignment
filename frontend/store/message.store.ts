import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SignedMessage } from "@/types";

interface MessageState {
  messages: SignedMessage[];
  addMessage: (message: SignedMessage) => void;
  removeMessage: (id: string) => void;
  clearMessages: () => void;
}

export const useMessageStore = create<MessageState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) =>
        set((state) => ({
          messages: [message, ...state.messages],
        })),
      removeMessage: (id) =>
        set((state) => ({
          messages: state.messages.filter((msg) => msg.id !== id),
        })),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: "message-storage",
    }
  )
);