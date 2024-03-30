'use client'
import React from 'react'
import _ from 'lodash'
import { createRoot } from 'react-dom/client'
import { GTAVirtualRootId } from '../utils/constants'
import { Provider } from 'react-redux'
import store from './store'

const App = () => {
    return (
        <Provider store={store}>
            <div id="root"></div>
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
