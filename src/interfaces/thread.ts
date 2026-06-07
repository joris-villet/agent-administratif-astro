export type TMessageThread = {
  id: number;
  role: string;
  content: string;
}

export interface IThread {
  id: number;
  threadId: string;
  title: string | null;
  createdAt: string;
  updatedAt: string;
  messages: TMessageThread[]
  threadFirstContent: string;
}