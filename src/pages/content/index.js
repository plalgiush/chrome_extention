console.log(123123);

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'printFile') {
    chrome.printing.printFile(message.filePath)
  }
})