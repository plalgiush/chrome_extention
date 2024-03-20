import { useEffect, useState } from 'react';
import './App.css';
import { db } from './db/db';
import { FilesList } from './components/FilesList/FilesList';

function App() {
  const [fileObj, setFile] = useState({ base64: undefined, name: undefined, type: undefined })

  async function addFile() {
    if (!fileObj.name) return

    try {
      const id = await db.files.add(
        fileObj
      )

      console.log(`File ${fileObj.name} successfully added. Got id ${id}`)
    } catch (error) {
      console.error(`Failed to add ${fileObj.name}: ${error}`)
    }
  }

  const getFile = (e) => {
    let reader = new FileReader()
    reader.readAsDataURL(e[0])
    setFile(prevState => ({ ...prevState, name: e[0].name, type: e[0].type }))
    reader.onload = (e) => {
      setFile(prevState => ({ ...prevState, base64: reader.result }))
    }
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
          src="about:blank"
          style={{ width: '100%', height: '100%' }}
          title="Receipt"
        />
    </div>
  );
}

export default App;