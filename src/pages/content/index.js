const c = 'content.js'
console.log(c)

const getFileBlob = async(base64) => {
  try {
    const response = await fetch(base64)
    const blob = await response.blob()

    // console.log(38, blob)

    const fileL = new File([blob], "File name",{ type: `${blob.type}` })
    const url = URL.createObjectURL(fileL)
    // console.log(42, url)

    const iframe = document.createElement("iframe")
    document.body.appendChild(iframe)

    iframe.src = url
    iframe.onload = function(){
      // console.log(this)
      iframe.contentWindow.print()
      URL.revokeObjectURL(url)
      // document.body.removeChild(iframe)
    }
  } catch(err) {
    console.error(err)
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log(c, request)
    if (request.action === 'testStorage') {
      chrome.storage.local.get("fileObj", function(items) {
        const {url = items.fileObj.url, type = items.fileObj.type} = items

        if (!chrome.runtime.error) {
          // console.log(78, url, type)
          getFileBlob(url)
        }
      })
    }
    sendResponse({farewell: "goodbye"})
})

// chrome.runtime.onMessage.addListener((req, info, cb) => {
//   // console.log(req, info, cb);
//   if (req.action === "print-file") {
//     // console.log('printing')

//     return true;
//   }
// })