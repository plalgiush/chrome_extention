import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/db";

export function FilesList() {
    const files = useLiveQuery(() => db.files.toArray())

    const printFile = async(blob) => {
      try {
        const file = new File([blob], "File name",{ type: "application/pdf" })
        const url = URL.createObjectURL(file)
        console.log(url)
        const iframe = document.getElementById('receipt')

        iframe.src = url
        iframe.onload = () => {
          iframe.contentWindow.print()
          URL.revokeObjectURL(url)
        }
      } catch(err) {
        console.error(err)
      }
    }

    const getFileBlob = async(file) => {
      try {
        const response = await fetch(file)
        const blob = await response.blob()
  
        console.log(blob)
        printFile(blob)
      } catch(err) {
        console.error(err)
      }
    }
  
    return (
      <ul>
        {files?.map((file) => (
          <li key={file.id} onClick={() => {getFileBlob(file.file)}}>
            {file.file}
          </li>
        ))}
      </ul>
    );
  }