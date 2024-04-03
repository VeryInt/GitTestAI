import { createAsyncThunk, createSlice, original, PayloadAction } from '@reduxjs/toolkit'
import type { AppState, AppThunk } from './store'
import * as API from './API'
import { fetchRawCodeByUrl, fetchAITestCase, fetchAITestCaseStream } from './API'
import { IGTAState, ChatKey } from './interface'
import type { AsyncThunk } from '@reduxjs/toolkit'
import _ from 'lodash'
import { testCasePrompt } from '../utils/prompts'
import dayjs from 'dayjs'

// define a queue to store api request
type APIFunc = (typeof API)[keyof typeof API]
type APIFuncName = keyof typeof API
export const getGTAState = (state: AppState): IGTAState => state.GTAStore

const initialState: IGTAState & Record<string, any> = {
    requestInQueueFetching: false,
}

type RequestCombo = {
    apiRequest: APIFunc
    asyncThunk?: AsyncThunk<any, any, any>
}
const apiRequestQueue: Array<RequestCombo> = []
// define a thunk action to wrap api request
const makeApiRequestInQueue = createAsyncThunk(
    'GTASlice/makeApiRequestInQueue',
    async (requestCombo: RequestCombo, { dispatch, getState }: any) => {
        const GTAState = getGTAState(getState())
        const { requestInQueueFetching } = GTAState || {}

        // 将接口请求添加到队列中，并设置isFetching为true
        apiRequestQueue.push(requestCombo)

        if (requestInQueueFetching) {
            // if there is a request in progress, return a resolved Promise
            return Promise.resolve()
        }

        const { setRequestInQueueFetching } = GTASlice.actions
        dispatch(setRequestInQueueFetching(true))

        // loop through the queue and process each request
        while (apiRequestQueue.length > 0) {
            const nextRequestCombo = apiRequestQueue.shift()
            if (nextRequestCombo) {
                const { apiRequest, asyncThunk } = nextRequestCombo || {}

                // send api request
                try {
                    // @ts-ignore
                    asyncThunk && dispatch(asyncThunk.pending())
                    // @ts-ignore
                    dispatch(makeApiRequestInQueue.pending())
                    // @ts-ignore
                    const response = await apiRequest()
                    // @ts-ignore
                    asyncThunk && dispatch(asyncThunk.fulfilled(response))
                    // @ts-ignore
                    dispatch(makeApiRequestInQueue.fulfilled(response))
                } catch (error) {
                    // @ts-ignore
                    asyncThunk && dispatch(asyncThunk.rejected(error))
                    // @ts-ignore
                    dispatch(makeApiRequestInQueue.rejected(error))
                }
            }
        }

        // set RequestInQueueFetching to false when all requests are processed
        dispatch(setRequestInQueueFetching(false))
    }
)

export const getRawCode = createAsyncThunk(
    "GTASlice/getRawCode",
    async (
        params: Record<string, any>,
        { dispatch, getState }: any
    ) => {
        const GTAState = getGTAState(getState())
        const { currentPageUrl } = GTAState || {}
        const rawCodeUrl = currentPageUrl.replace(/\/blob\//, "/raw/")
        // const rawCodeResult = await fetchRawCodeByUrl({ url: currentPageUrl })
        dispatch(
            makeApiRequestInQueue({
                apiRequest: fetchRawCodeByUrl.bind(null, {
                    url: rawCodeUrl
                }),
                asyncThunk: getRawCode,
            })
        )
    }
)

export const getAITestCase = createAsyncThunk(
    "GTASlice/getAITestCase",
    async (
        params: Record<string, any>,
        { dispatch, getState }: any
    )=>{
        dispatch(
            makeApiRequestInQueue({
                apiRequest: async ()=>{
                    const GTAState = getGTAState(getState())
                    const { rawCode } = GTAState || {}
                    const prompt = testCasePrompt(rawCode)
                    return await fetchAITestCase({
                        prompt,
                        // isStream: true,
                        queryQwen: true,
                        queryGeminiPro: true,
                    })
                },
                asyncThunk: getAITestCase,
            })
        )
    }
)

export const getAITestCaseStream = createAsyncThunk(
    "GTASlice/getAITestCaseStream",
    async (
        {selection}: {selection?: string},
        { dispatch, getState }: any
    )=>{
        const GTAState = getGTAState(getState())
        const { rawCode, chats } = GTAState || {}
        const code = selection || rawCode
        const prompt = testCasePrompt(code)
        let newChats: Partial<Record<ChatKey, any>> =  {};
        const streamHandler = ({data, status}: {data: string, status?: boolean})=>{
            try{
                const {hasNext, incremental} = JSON.parse(data) || {}
                console.log(`incremental`, incremental)
                _.map(incremental, ({items, path}: {items: string[], path: (string | Number)[]})=>{
                    const [chat, aiType, index] = path as [string, String, Number]
                    const theAiType = _.find(Object.values(ChatKey), value => {
                        return aiType.startsWith(value)
                    });
                    if(theAiType){
                        newChats[theAiType] = `${newChats[theAiType] || ''}${items.join("")}`
                    }
                })

                dispatch(updateState({chats: {...newChats}, openCaseShow: true}))
            }catch(e){

            }

        }
        await fetchAITestCaseStream({
            prompt,
            isStream: true,
            // queryQwen: true,
            queryGroq: true,
            // queryGeminiPro: true,
            streamHandler,
        })
    }
)

export const GTASlice = createSlice({
    name: 'GTASlice',
    initialState,
    reducers: {
        getCurrentPageUrl: (state, action: PayloadAction<string>) => {
            state.currentPageUrl = action.payload
        },
        setRequestInQueueFetching: (state, action: PayloadAction<boolean>) => {
            state.requestInQueueFetching = action.payload
        },
        updateState: (state, action: PayloadAction<Partial<IGTAState>>) => {
            return { ...state, ...action.payload }
        },
        clearRequestQueue: state => {
            apiRequestQueue.length = 0
            return { ...state }
        },
    },
    extraReducers: builder => {
        builder.addCase(getRawCode.fulfilled, (state, action) => {
            if (action.payload as any) {
                const { status, data } = (action.payload as any) || {}
                if (status && data) {
                    state.rawCode = data;
                }
            } else {
                return { ...state }
            }
        })
    },
})

// export actions
export const {
    getCurrentPageUrl,
    updateState,
    clearRequestQueue,
} = GTASlice.actions
export default GTASlice.reducer
