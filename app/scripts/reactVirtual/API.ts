import _ from 'lodash'
import { getGraphqlAIMashupBody } from '../utils/tools'
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { IGrahpqlAIFetchProps } from '../utils/interfaces'
import { graphqlAIMashupUrl } from '../utils/constants'

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

export const fetchAITestCase = async (paramsForAIGraphql: IGrahpqlAIFetchProps) => {
    let data = null,
    status = false;
    const graphqlUrl = graphqlAIMashupUrl
    const body = getGraphqlAIMashupBody({
        ...paramsForAIGraphql,
        name: `GetAiTestCasesQuery`
    })

    try{
        const response = await fetch(graphqlUrl, {
            ...commonOptions,
            method: "POST",
            body: JSON.stringify(body),
        })
        if (!response.ok) {
            return {
                status,
                data,
            }
        }
        data = await response.json()
        status = true

    }catch(e){
        console.log(`fetchAITestCase`, e)
    }

    return {
        data,
        status,
    }
}

const abortController = new AbortController()
export const fetchAITestCaseStream = async (paramsForAIGraphql: IGrahpqlAIFetchProps) => {
    const graphqlUrl = graphqlAIMashupUrl
    const { streamHandler, completeHandler, ...rest} = paramsForAIGraphql || {}
    const body = getGraphqlAIMashupBody({
        ...rest,
        name: `GetAiTestCasesQuery`
    })
    try{
        await fetchEventSource(graphqlUrl, {
            ...commonOptions,
            method: "POST",
            body: JSON.stringify(body),
            onmessage(ev) {
                console.log(ev.data);
                const data = ev?.data || {}
                if(streamHandler){
                    streamHandler({
                        data,
                        status: true,
                    });
                }
            },
            onclose() {
                if(completeHandler){
                    completeHandler({
                        data: null,
                        status: true,
                    });
                }
            },
            onerror(err) {
                if(completeHandler){
                    completeHandler({
                        err,
                        status: false,
                    });
                }
            },
            signal: abortController.signal
        });
    }catch(e){
        console.log(`fetchAITestCase`, e)
    }
}