chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({
      url: 'printing/printers.html'
    });
});