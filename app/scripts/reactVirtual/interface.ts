export type ChatKey = "GeminiPro" | "Qwen" | "Moonshot" | "Groq" | "Claude"
export interface IGTAState extends Record<string, any> {
    requestInQueueFetching: boolean

    chats?: {
        [chatKey in ChatKey]?: string
    }
}
