import { injectVirtualRoot, injectVirtualStyle } from './injects'
import store from '../reactVirtual/store'
import _ from 'lodash'
// @ts-ignore
import Cookies from 'js-cookie'
import { getAITestCaseStream } from '../reactVirtual/slice'


const contentRun = async () => {
    console.log(`this is GTA contentRun`)
}


// 监听页面的加载完成事件, 注入自定义脚本到页面中
window.addEventListener('load', () => {
    console.log(`this is load`)
    injectVirtualRoot()
    injectVirtualStyle()

    contentRun()
})

window.addEventListener("message", function(event) {
    const data = event?.data || {}
    const { source, messageInfo } = data || {};
    if(source == `git-test-ai`){
        console.log(`messageInfo from ${source}`, messageInfo)
        const { documentSelection } = messageInfo || {}
        store.dispatch(getAITestCaseStream({
            selection: documentSelection
        }))
    }
    return;
})

