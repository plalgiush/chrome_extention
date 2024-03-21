import React, { useState } from 'react'
// import { setStorageData } from '../../db/storageData'
// import { getStorageData } from '../../db/getStorageData'

const Popup = () => {
  const [getingFiles, setGetingFiles] = useState(null)

  const setStorageData = async(getingFile, base64) => {
    try {
      const response = await fetch(base64)
      const blob = await response.blob()

      chrome.storage.local.set({ "fileObj" : { name: getingFile, url: response.url, type: blob.type} }, function() {
        if (chrome.runtime.error) {
          console.log("Runtime error.")
        }
      })
    } catch(err) {
      console.error(err)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setGetingFiles(file.name)

    let reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => {
      setStorageData(file.name, reader.result)
    }
  }

  const handlePrint = async() => {
    if (getingFiles) {
      chrome.storage.local.get("fileObj", function(items) {
        const {name = items.fileObj.name , url = items.fileObj.url, type = items.fileObj.type} = items

        if (!chrome.runtime.error) {
          chrome.runtime.sendMessage({ action: "printing", url, type })
        }
      })
    }
  }

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "uploadedFile") {
      chrome.storage.local.get("fileObj", function(items) {
        const {name = items.fileObj.name , url = items.fileObj.url, type = items.fileObj.type} = items
  
        if (!chrome.runtime.error) {
          setGetingFiles(name)
        }
      })
    }
  })

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {getingFiles}
      <button onClick={handlePrint} disabled={!getingFiles}>Print</button>
    </div>
  )
}

export default Popup;
