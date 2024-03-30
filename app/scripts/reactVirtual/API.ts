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