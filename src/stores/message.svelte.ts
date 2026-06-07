import type { IMessage, IConversationResponse } from "@/interfaces/conversation";


interface IStoreMessage {
  messages: IMessage[];
  //messages: IConversationResponse[]
  isLoading: boolean;
  maxTokens: number;
  userTokens: number;
  tokenUsed: number;
  threadId: string | null;
}


export const storeMessage = $state<IStoreMessage>({
  messages: [],
  isLoading: false,
  maxTokens: 20000,
  userTokens: 20000,
  tokenUsed: 0,
  threadId: null,
});

// export const counterMessages = () => $derived(storeMessage.messages.length);
// console.log("counterMessages", counterMessages);