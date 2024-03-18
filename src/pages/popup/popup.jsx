import React from 'react'

const Popup = () => {
  // const handlePrint = (event) => {
  //   const file = event.target.files[0]
  //   if (file) {
  //     const fileURL = URL.createObjectURL(file)
  //     chrome.tabs.create({ url: fileURL })
  //   }
  // }

  const handlePrint = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
      const tab = tabs[0]
      if (tab) {
        chrome.tabs.sendMessage(tab.id, { action: 'printFile', fileUrl }, (response) => {
          if (!response) {
            console.error('Error: Could not establish connection. Receiving end does not exist.')
          }
        })
      } else {
        console.error('Error: No active tab found.')
      }
    }
  }

  return (
    <div className="App">
      <h1>Choose a file to print</h1>
      <input type="file" onChange={handlePrint} />
    </div>
  )
}

export default Popup;
