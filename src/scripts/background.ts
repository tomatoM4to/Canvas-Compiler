
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
