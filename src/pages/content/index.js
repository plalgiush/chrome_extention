const c = 'content.js'
console.log(c)
let getingFiles

const getFileBlob = async(base64) => {
  try {
    const response = await fetch(base64)
    const blob = await response.blob()

    const fileL = new File([blob], "File name",{ type: `${blob.type}` })
    const url = URL.createObjectURL(fileL)

    const iframe = document.createElement("iframe")
    document.body.appendChild(iframe)


    if (blob.type.startsWith("image/")) {
      const img = document.createElement("img")
      img.src = url
      img.onload = () => {
        iframe.contentDocument.body.appendChild(img)
        img.onload = null
        iframe.contentWindow.print()
        URL.revokeObjectURL(url)
      }
    } else {
      iframe.src = url
      iframe.onload = () => {
        iframe.onload = null
        iframe.contentWindow.print()
        URL.revokeObjectURL(url)
      }
    }
    // iframe.src = url
    // iframe.onload = function(){
    //   iframe.contentWindow.print()
    //   URL.revokeObjectURL(url)
    //   // document.body.removeChild(iframe)
    // }
  } catch(err) {
    console.error(err)
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'testStorage') {
      chrome.storage.local.get("fileObj", function(items) {
        const {url = items.fileObj.url, type = items.fileObj.type} = items

        if (!chrome.runtime.error) {
          getFileBlob(url)
        }
      })
    } else if (request.action === 'testUploadFile') {
      console.log('we are there')
      chrome.storage.local.get("fileObj", function(items) {
        const {url = items.fileObj.url, type = items.fileObj.type} = items

        if (!chrome.runtime.error) {
          getFileBlob(url)
        }
      })
    }

    // if (req.action === "print-file") {
    //   console.log('printing')
    //   return true;
    // }

    sendResponse({farewell: "goodbye"})
})

const fileInput = document.querySelector("input[type=file]")
const output = document.querySelector(".output")

fileInput.addEventListener("change", async (e) => {
  const [file] = fileInput.files

  if (file) {
    setStorageData(file)
  }
});

const setStorageData = (data) => {
  let reader = new FileReader()
  reader.readAsDataURL(data)

  getingFiles = data.name
  reader.onload = (e) => {
    getFileBlob2(reader.result)
  }
}

const getFileBlob2 = async(base64) => {
  try {
    const response = await fetch(base64)
    const blob = await response.blob()

    chrome.storage.local.set({ "fileObj" : { name: getingFiles, url: response.url, type: blob.type} }, function() {
      chrome.runtime.sendMessage({ action: 'testUploadFile' })

      if (chrome.runtime.error) {
        console.log("Runtime error.");
      }
    })
  } catch(err) {
    console.error(err)
  }
}
