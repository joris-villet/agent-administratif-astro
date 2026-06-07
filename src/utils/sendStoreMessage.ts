import { storeMessage } from "@/stores/message.svelte";

// interface Message {
//   role: 'user' | 'assistant' | 'system';
//   content: string;
//   isNewMessage: boolean;
// }

type Role = 'user' | 'assistant' | 'system';

export const sendStoreMessage = (role: Role, content: string, isNewMessage: boolean) => {
  storeMessage.messages = storeMessage.messages.concat({
    role: role,
    content: content,
    isNewMessage: isNewMessage,
  });
}