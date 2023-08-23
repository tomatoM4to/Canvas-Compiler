
chrome.webNavigation.onHistoryStateUpdated.addListener(
    async () => {
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        // @ts-ignore
        const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
        console.log(response);
    }
)
