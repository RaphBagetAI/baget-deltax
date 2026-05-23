// Listen for navigation changes (important for SPAs like Indy)
chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
    if (details.url.includes('indy.fr') && details.url.includes('/transactions')) {
        // Notify the content script that the URL has changed
        chrome.tabs.sendMessage(details.tabId, { action: 'url_changed', url: details.url }).catch(() => {
            // Ignore error if content script hasn't loaded yet
        });
    }
});