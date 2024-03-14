import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/db";

export function FilesList() {
    const files = useLiveQuery(() => db.files.toArray())

    const printFile = async(fileBlob, fileType) => {
      try {
        const file = new File([fileBlob], "File name",{ type: `${fileType}` })
        const url = URL.createObjectURL(file)
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

    const getFileBlob = async(base64, type) => {
      try {
        const response = await fetch(base64)
        const blob = await response.blob()
  
        printFile(blob, type)
      } catch(err) {
        console.error(err)
      }
    }
  
    return (
      <ul>
        {files?.map((fileObj) => (
          <li key={fileObj.id} onClick={() => {getFileBlob(fileObj.base64, fileObj.type)}}>
            {fileObj.name}
          </li>
        ))}
      </ul>
    );
  }