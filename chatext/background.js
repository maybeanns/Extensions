// background.js
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed!");
});

// Example of handling messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getResponse") {
        // Here you can handle requests from the popup
        sendResponse({ response: "This is a response from the background script." });
    }
});