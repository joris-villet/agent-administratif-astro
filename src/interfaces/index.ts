export interface IMessage {
  role: string;
  content: string;
  isNewMessage?: boolean;
}

export interface IUser {
  id?: number;
  google_id?: string;
  name?: string;
  email: string;
  picture?: string;
  first_connection?: boolean;
  niveau_language?: string;
}

export interface IResponseTeacher {
  message: string;
  token: number;
  threadId: string;
  title?: string;
}

export interface IResponseTeacher {
  content: string;
  token: number;
  threadId: string;
}




