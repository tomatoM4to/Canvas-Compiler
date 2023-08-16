let a = 0;
setInterval(() => {
    chrome.runtime.sendMessage({message: `content count: ${a++}`});
}, 1000)
