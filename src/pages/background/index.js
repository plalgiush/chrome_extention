console.log('background loaded')
// Тест работы в background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'printFile') {
      const iframe = document.getElementById('receipt')
      iframe.onload = () => {
        iframe.contentWindow.print()
        URL.revokeObjectURL(message.fileBlobURL)
        document.body.removeChild(iframe)
      }
      iframe.src = message.fileBlobURL
    }
})