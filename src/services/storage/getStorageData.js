// import { printFile } from "../../utils/printing"

export const getStorageData = async(action) => {
    console.log('getStorage', action)

    try {
        chrome.storage.local.get("fileObj", function(items) {
            const {url = items.fileObj.url, type = items.fileObj.type} = items

            if (!chrome.runtime.error && action === "printing") {
                printFile(url)
            }
        })
    } catch(err) {
        console.error(err)
    }
}

const printFile = async(base64) => {
  try {
    const response = await fetch(base64)
    const blob = await response.blob()
    const file = new File([blob], "File name", { type: `${blob.type}` })
    const url = URL.createObjectURL(file)
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
  } catch(err) {
    console.error(err)
  }
}