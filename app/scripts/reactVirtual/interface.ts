export enum ChatKey {
    Qwen = "Qwen",
    GeminiPro = "GeminiPro",
    Moonshot = "Moonshot",
    Groq = "Groq",
    Claude = "Claude",
    Zhipu = "Zhipu",
    Lingyiwanwu = "Lingyiwanwu",
    Openai = "Openai",
    Ernie = "Ernie",
}
export interface IGTAState extends Record<string, any> {
    requestInQueueFetching: boolean
    openCaseShow?: boolean
    chats?: {
        [chatKey in ChatKey]?: string
    }
}
