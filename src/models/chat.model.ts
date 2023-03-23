export type ContentType = 'file' | 'text' | 'audio';
export type Content = {
    type: ContentType;
    value: File | string;
};

export interface Message {
    id: number;
    owner: string;
    content: Content;
    sendDate: string;
    chatId: number;
}

export interface Chat {
    id: number;
    name: string;
    messages: Message[];
    members: string[];
}
