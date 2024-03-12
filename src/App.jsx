import { useEffect, useState } from 'react';
import './App.css';
import { db } from './db/db';
import { FilesList } from './components/FilesList/FilesList';

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [file, setFile] = useState()

  async function addFile() {
    try {
      const id = await db.files.add({
        file
      })

      console.log(`File ${file} successfully added. Got id ${id}`)
    } catch (error) {
      console.error(`Failed to add ${file}: ${error}`)
    }
  }

  const getFile = (e) => {
    let reader = new FileReader()
    reader.readAsDataURL(e[0])
    reader.onload = (e) => {
      setFile(reader.result)
    }
  }

  const handleMessage = (event) => {
    if (event.data.action === 'receipt-loaded') {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  const printIframe = (id) => {
    const iframe = document.frames
      ? document.frames[id]
      : document.getElementById(id)
    const iframeWindow = iframe.contentWindow || iframe

    iframe.focus()
    iframeWindow.print()

    return false
  }

  return (
    <div className="App">
        <form>
          <h1>File Upload</h1>
          <input type="file" onChange={(e) => getFile(e.target.files)}/>
          <button type="button" onClick={addFile}>Upload</button>
        </form>
        <FilesList />

        <iframe
          id="receipt"
          src="/payment/receipt"
          style={{ display: 'none' }}
          title="Receipt"
        />
        <button onClick={()=> printIframe('receipt')}>
          {isLoading ? 'Loading...' : 'Print Receipt'}
        </button>
    </div>
  );
}

export default App;