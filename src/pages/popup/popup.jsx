import React from 'react'
import { FilesList } from '../../components/FilesList/FilesList';

const Popup = () => {
  return (
    <>
      <div className="App">
        <h1>
          Chose a file to the print
        </h1>
        <FilesList />
        <button
          onClick={() => alert(<FilesList />)}>
          Toggle theme
        </button>
      </div>
    </>
  )
}

export default Popup;
