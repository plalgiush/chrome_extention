const b = 'background loaded'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // console.log(b, request)
  if (request.action === 'testStorage') {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs.length > 0) {
        let activeTab = tabs[0]

        chrome.tabs.sendMessage(activeTab.id, {url: request.url, action: request.action, type: request.type }, (response) => {
          if (response) {
            console.log(12, response.farewell);
          } else {
            console.log("No response received");
          }
        })
      } else {
        console.log("No active tabs found")
      }
    })
  } else if (request.action === 'testUploadFile') {
    chrome.storage.local.get("fileObj", function(items) {
      const {url = items.fileObj.url, type = items.fileObj.type} = items

      if (!chrome.runtime.error) {
        console.log('we are added file into extension')

        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
          if (tabs.length > 0) {
            let activeTab = tabs[0]
    
            chrome.tabs.sendMessage(activeTab.id, {url: request.url, action: request.action, type: request.type }, (response) => {
              if (response) {
                console.log(response.farewell);
              } else {
                console.log("No response received");
              }
            })
          } else {
            console.log("No active tabs found")
          }
        })
      }
    })
    console.log('hi from browser page')
  }
  // if (request.type === 'printFile') {
  //   console.log(b, request.fileUrl)
    // chrome.tabs.create({ url: request.fileUrl, active: false }, (tab) => {
    //   chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    //     if (tabId === tab.id && changeInfo.status === 'complete') {
    //       chrome.tabs.sendMessage(tabId, { type: 'print' });
    //     }
    //   });
    // });
  // }
})

// chrome.commands.onCommand.addListener((command) => {
//   if (command === "print-file") {
//     getCurrentTabId().then((tabId) => {
//       chrome.tabs.sendMessage(tabId, { action: "print-file" });
//     });
//   }
// });

// async function getCurrentTabId() {
//   let queryOptions = { active: true, lastFocusedWindow: true };
//   let [tab] = await chrome.tabs.query(queryOptions);
//   console.log(tab)
//   return tab.id;
// }