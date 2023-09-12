chrome.action.onClicked.addListener((tab) => {
    if (tab.url && tab.url.startsWith("https://chat.openai.com/")) {
        chrome.scripting.executeScript({
            // @ts-ignore
            target: { tabId: tab.id },
            files: ["app/content.js"]
        });
    }
});


chrome.webNavigation.onHistoryStateUpdated.addListener(
    async () => {
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        if (tab.status === "complete") {
            // @ts-ignore
            chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, (response) => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                } else {
                    console.log(response);
                }
            });
        }
    }
);
