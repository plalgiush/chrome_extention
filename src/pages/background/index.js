console.log('background loaded')

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message, sender, sendResponse)
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