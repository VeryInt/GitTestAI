'use client'
import React, { useEffect } from 'react'
import _ from 'lodash'
import { createRoot, Root } from 'react-dom/client'
import { GTAVirtualRootId } from '../utils/constants'
import { Provider } from 'react-redux'
import store from './store'
import { useAppSelector, useAppDispatch } from './hooks'
import { getGTAState, getCurrentPageUrl, getRawCode, getAITestCase, updateState } from './slice'
import CaseShow from './modules/CaseShow'

const App = () => {
    return (
        <Provider store={store}>
            <VirtualRoot />
        </Provider>
    )
}

let root: Root;
export const renderVirtualPage = ({selection}: {selection?: string}) => {
    const virtualRoot = document.getElementById(GTAVirtualRootId) as HTMLElement
    root = createRoot(virtualRoot)
    root.render(
        <div className="left-0 top-0">
            <Provider store={store}>
                <VirtualRoot selection={selection}/>
            </Provider>
        </div>
    )
}

const VirtualRoot = ({selection}: {selection?: string})=>{
    useSetInitialState({selection})
    const state = useAppSelector(getGTAState)
    const dispatch = useAppDispatch()
    const { chats, openCaseShow } = state || {}
    const { Groq } = chats || {}

    const handleOpenChange = (isOpen: boolean)=>{
        console.log(`isOpen`, isOpen)
        dispatch(updateState({openCaseShow: isOpen}))
    }
    return (
        <div id="root">
            <CaseShow content={Groq || ''} open={openCaseShow} callbackOnOpenChange={handleOpenChange} />
        </div>
    )
}

const useSetInitialState = ({selection}: {selection?: string}) => {
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
        dispatch(updateState({selection}))
    }, [])
}