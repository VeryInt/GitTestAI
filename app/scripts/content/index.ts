import { injectVirtualRoot, injectVirtualStyle } from './injects'
import store from '../reactVirtual/store'
import _ from 'lodash'
// @ts-ignore
import Cookies from 'js-cookie'


const contentRun = async () => {
    console.log(`this is contentRun`)
}


// 监听页面的加载完成事件, 注入自定义脚本到页面中
window.addEventListener('load', () => {
    console.log(`this is load`)
    injectVirtualRoot()
    injectVirtualStyle()

    contentRun()
})