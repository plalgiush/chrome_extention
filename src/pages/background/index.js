const b = 'background'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(b, request.action)

  if (request.action === "printing") {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs.length > 0) {
        let activeTab = tabs[0]

        chrome.tabs.sendMessage(activeTab.id, {url: request.url, action: request.action, type: request.type }, (response) => {
          if (response) {
            console.log(response.farewell)
          } else {
            console.log("No response received")
          }
        })
      } else {
        console.log("No active tabs found")
      }
    })
  }
})

chrome.commands.onCommand.addListener((command) => {
  if (command === "printing") {
    getCurrentTabId().then((tabId) => {
      chrome.tabs.sendMessage(tabId, { action: "printing" })
    })
  }
})

async function getCurrentTabId() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab.id;
}