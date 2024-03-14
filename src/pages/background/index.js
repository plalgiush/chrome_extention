console.log('background loaded');

chrome.storage.local.get('files', function(data) {
    console.log(data)
})
  