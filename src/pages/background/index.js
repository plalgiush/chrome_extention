console.log('background loaded');

chrome.runtime.onInstalled.addListener(function() {
    chrome.printing.getPrinters(function(printers) {
      console.log("Printers:", printers)
    })
  })