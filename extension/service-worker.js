const Match_URL = ['.com']

const mainPage = './dist/main.html'
const optionsPage = './dist/options.html'

chrome.action.onClicked.addListener(async tab => {
    console.log(`chrome action onClicked`)
    if (!tab.url) return
    const url = new URL(tab.url)
    const tabId = tab.id
    const isInMatchUrl = Match_URL.some(function (matchurl) {
        return url.origin.includes(matchurl)
    })

    if (isInMatchUrl) {
        // inject script in page first
    }
})

// hook by background service-worker
chrome.scripting.registerContentScripts([
    {
        id: 'git-test-ai-inject',
        matches: ['http://*/*', 'https://*/*'],
        js: ['inject-script.js'],
        runAt: 'document_start',
        world: 'MAIN',
        allFrames: true,
    },
])

chrome.contextMenus.create({
    id: 'git-test-ai-context-menu-runtest',
    title: 'GitTestAi-获取测试用例', // 菜单项的文本
    contexts: ['all'] // 菜单项显示的上下文环境，'all' 表示所有页面
});
  
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    // 当用户点击菜单项时，这里会被调用
    // info 是关于菜单项的信息对象
    // tab 是关于当前激活标签页的信息对象
    console.log('Menu item clicked:', info);
 
    const {selectionText} = info || {}
    // window.postMessage({source: "git-test-ai", messageInfo: {
    //     selectionText
    // }})

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        const tabId = tabs?.[0]?.id || ``;
        if(!tabId) return;
        chrome.scripting.executeScript({
            target: { tabId },
            world: "MAIN", 
            args: [{source: "git-test-ai", messageInfo: {
                selectionText
            }}],
            func: (...args) => injectScript(...args),
        });

        // chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
        //     console.log(response.farewell);
        // });
    });
});