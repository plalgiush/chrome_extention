const b = 'background loaded'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // console.log(b, request, sender, sendResponse)
  if (request.action === 'testStorage') {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs.length > 0) {
        let activeTab = tabs[0]
        // chrome.printerProvider.onGetPrintersRequested.addListener(
        //   function ( resultCallback ) {
        //       console.log(resultCallback)
        //       resultCallback( [{
        //           id: 'customprinter',
        //           name: 'Custom Printer',
        //           description: ''
        //       }] );
        //   }
        // );
        
        // chrome.printerProvider.onGetCapabilityRequested.addListener(function (printerId, resultCallback) {
        //     console.log(printerId);
        //     if(printerId == 'customprinter') {
        //         resultCallback(capabilities);
        //     }
        // })
        chrome.tabs.sendMessage(activeTab.id, {url: request.url, action: request.action, type: request.type }, (response) => {
          if (response) {
            // console.log(11, response.farewell);
          } else {
            console.log("No response received");
          }
        })
      } else {
        console.log("No active tabs found")
      }
    })
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