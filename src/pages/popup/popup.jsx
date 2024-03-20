import React, { useState } from 'react'

const Popup = () => {
  const [file, setFile] = useState(null)
  const [getingFiles, setGetingFiles] = useState(null)
  const [fileFromWeb, setFileFromWeb] = useState(null)

  const getFileBlob = async(base64) => {
    try {
      const response = await fetch(base64)
      const blob = await response.blob()

      const fileL = new File([blob], "File name",{ type: `${blob.type}` })
      const url = URL.createObjectURL(fileL)

      chrome.storage.local.set({ "fileObj" : { url: response.url, type: blob.type} }, function() {
        if (chrome.runtime.error) {
          console.log("Runtime error.");
        }
      })
    } catch(err) {
      console.error(err)
    }
  }

  const setStorageData = (data) => {
    let reader = new FileReader()
    reader.readAsDataURL(data)

    setGetingFiles(data.name)
    reader.onload = (e) => {
      getFileBlob(reader.result)
    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setStorageData(e.target.files[0])
  }

  const handlePrint = async() => {
    if (file) {
      chrome.storage.local.get("fileObj", function(items) {
        const {url = items.fileObj.url, type = items.fileObj.type} = items

        if (!chrome.runtime.error) {
          chrome.runtime.sendMessage({ action: 'testStorage', url, type })
        }
      })
      // const fileUrl = URL.createObjectURL(file)
      // chrome.runtime.sendMessage({ type: 'printFile', fileUrl });

      // const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
      // const tab = tabs[0]
      // if (tab) {
      //   chrome.runtime.sendMessage({ type: 'printFile', fileUrl });
      //   // chrome.tabs.sendMessage(tab.id, { action: 'printFile', fileUrl }, (response) => {
      //   //   if (!response) {
      //   //     console.error('Error: Could not establish connection. Receiving end does not exist.')
      //   //   }
      //   // })
      // } else {
      //   console.error('Error: No active tab found.')
      // }
    }
  }

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    chrome.storage.local.get("fileObj", function(items) {
      const {name = items.fileObj.name , url = items.fileObj.url, type = items.fileObj.type} = items

      if (!chrome.runtime.error) {
        setFileFromWeb(name)
      }
    })
  })

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {getingFiles || fileFromWeb}
      <button onClick={handlePrint} disabled={!file}>Print</button>
    </div>
  )
}

export default Popup;
