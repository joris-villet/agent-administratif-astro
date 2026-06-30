
export type TConversation = {
  id?: number,
  conversationId?: number,
  role: 'user' | 'assistant',
  content: string,
  createdAt: string
}

export interface IConversationResponse {
  messages: TConversation[]
}

export interface IMessage {
  role: string;
  content: string;
  isNewMessage?: boolean;
}
