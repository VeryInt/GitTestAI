'use client'
import React, { useEffect } from 'react'
import _ from 'lodash'
import { createRoot } from 'react-dom/client'
import { GTAVirtualRootId } from '../utils/constants'
import { Provider } from 'react-redux'
import store from './store'
import { useAppSelector, useAppDispatch } from './hooks'
import { getGTAState, getCurrentPageUrl, getRawCode, getAITestCase } from './slice'
import './globals.css'

const App = () => {
    
    return (
        <Provider store={store}>
            <VirtualRoot />
        </Provider>
    )
}

export const renderVirtualPage = () => {
    const virtualRoot = document.getElementById(GTAVirtualRootId) as HTMLElement
    const root = createRoot(virtualRoot)
    root.render(
        <div className="left-0 top-0">
            <App />
        </div>
    )
}

const VirtualRoot = ()=>{
    useSetInitialState()
    return <div id="root">

    </div>
}

const useSetInitialState = () => {
    const state = useAppSelector(getGTAState)
    const dispatch = useAppDispatch()
    useEffect(() => {
        console.log(`useSetInitialState`)
        const currentUrl = location.href;
        const urlObj = new URL(currentUrl) 
        const currentPageUrl = urlObj.origin + urlObj.pathname
        console.log(`currentPageUrl`, currentPageUrl)
        dispatch(getCurrentPageUrl(currentPageUrl))
        dispatch(getRawCode({}))
        // dispatch(getAITestCase({}))
    }, [])
}