console.log(123123)

function printFile(fileUrl) {
  console.log(fileUrl)
  // Выполняем печать
  window.print()
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let fr = document.createElement("iframe")
  document.body.appendChild(fr)

  console.log(message.fileUrl)
  if (message.action === 'printFile') {
    const iframe = document.getElementsByTagName('iframe')

    iframe.onload = () => {
      console.log(iframe.contentWindow)
      iframe.contentWindow.print()
      URL.revokeObjectURL(message.fileBlobURL)
      document.body.removeChild(iframe)
    };
    iframe.src = message.fileBlobURL
    // printFile(message.fileUrl)
  }
})