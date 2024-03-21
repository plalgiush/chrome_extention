import { getStorageData } from "../../services/storage/getStorageData"
import { setStorageData } from "../../services/storage/setStorageData"

const c = 'content.js'
console.log(c)

const fileInput = document.querySelector("input[type=file]")

fileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0]
  console.log(file)

  if (file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => {
      setStorageData('uploadedFile', file.name, reader.result)
    }
  }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "printing") {
      getStorageData(request.action)
    }

    sendResponse({farewell: "the file has been sent to print"})
})

