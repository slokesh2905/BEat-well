import { create } from 'zustand';

export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatState {
  messages: Message[];
  isOpen: boolean;
  hasConsent: boolean;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  toggleChat: () => void;
  setConsent: (consent: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isOpen: false,
  hasConsent: false,
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Math.random().toString(36).substring(7),
          timestamp: new Date(),
          ...message,
        },
      ],
    })),
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  setConsent: (consent) => set({ hasConsent: consent }),
  clearMessages: () => set({ messages: [] }),
}));