export enum ChatKey {
    Qwen = "Qwen",
    GeminiPro = "GeminiPro",
    Moonshot = "Moonshot",
    Groq = "Groq",
    Claude = "Claude",
}
export interface IGTAState extends Record<string, any> {
    requestInQueueFetching: boolean

    chats?: {
        [chatKey in ChatKey]?: string
    }
}
