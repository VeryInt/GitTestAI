;(function (history) {
    var originalPushState = history.pushState

    history.pushState = function (state, title, url) {
        if (typeof history.onpushstate == 'function') {
            history.onpushstate({ state: state })
        }

        // @ts-ignore
        url = url && url.search(/^http/) > -1 ? url : ''

        // 调用原生的 history.pushState 方法
        // @ts-ignore
        return originalPushState.apply(history, arguments)
    }
    console.log(history.pushState)
})(history)



const injectInit = ()=>{
    console.log(`this GTA inject script!!!`)

    if(typeof injectScript === 'undefined'){
        // @ts-ignore
        window.injectScript = async (requestArgs: Record<string, any>) => {
            const { source, messageInfo } = requestArgs || {};
            console.log(`injectScript get data then post message`, source)
            window.postMessage({source, messageInfo: {
                ...messageInfo,
                // @ts-ignore
                documentSelection: window.getSelection().toString().trim(),
            }})
        }
    }
}

injectInit()