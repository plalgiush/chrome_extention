import React from 'react'
import { FilesList } from '../../components/FilesList/FilesList';

const Popup = (props) => {
  const handlePrint = (event) => {
    const file = event.target.files[0]
    if (file) {
      const fileURL = URL.createObjectURL(file)
      chrome.tabs.create({ url: fileURL })
    }
  }

  return (
    <div className="App">
      <h1>Choose a file to print</h1>
      <input type="file" onChange={handlePrint} />
    </div>
  );
}

export default Popup;
