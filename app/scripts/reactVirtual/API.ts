import _ from 'lodash'
import { sleep } from '../utils/tools'

const commonOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
}

export const fetchRawCodeByUrl = async ({ url }: { url: string }) => {
    let data = null,
        status = false
    if(!url){
        return {
            data,
            status,
        }
    }

    try {
        const response = await fetch(url, {
            ...commonOptions,
            method: "GET"
        })
        if (!response.ok) {
            // throw new Error(response.statusText)
            return {
                status,
                data,
            }
        }
        data = await response.text()
        status = true
    } catch (e) {
        console.log(`fetchRawCodeByUrl`, e)
    }

    return {
        data,
        status,
    }
}

export const fetchAITestCase = async ({ prompt }: { prompt: string }) => {
    const graphqlUrl = `https://aimashup.moca.one/`
    const body = {
        operationName: "GetAiTestCasesQuery",
        query: `query GetAiTestCasesQuery($params: ChatArgs) {
            chat(params: $params) {
                GeminiProStream @stream
            }
          }`,
        variables: {
            params: {
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            }
        }
    }
    try{
        const response = await fetch(graphqlUrl, {
            ...commonOptions,
            method: "POST",
            body: JSON.stringify(body)
        })
        if (!response.ok) {
            // throw new Error(response.statusText)
            return {
                status: false,
                data: null
            }
        }
        const data = await response.json()
        console.log(`fetchAITestCase`, data)
        return {
            status: true,
            data
        }

    }catch(e){
        console.log(`fetchAITestCase`, e)
    }
}