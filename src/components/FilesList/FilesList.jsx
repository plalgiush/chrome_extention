import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/db";

export function FilesList() {
  const files = useLiveQuery(() => db.files.toArray())

  const printFile = async (fileBlob, fileType) => {
    try {
      console.log(fileBlob, fileType)
      const file = new File([fileBlob], "File name", { type: `${fileType}` })
      const url = URL.createObjectURL(file)
      const iframe = document.getElementById("receipt")
  
      // iframe.contentDocument.body.innerHTML = ""
  
      // while (iframe.contentDocument.body.firstChild) {
      //   iframe.contentDocument.body.removeChild(iframe.contentDocument.body.firstChild)
      // }
  
      if (fileType.startsWith("image/")) {
        const img = document.createElement("img")
        img.src = url
        img.onload = () => {
          iframe.contentDocument.body.appendChild(img)
          img.onload = null
          iframe.contentWindow.print()
          URL.revokeObjectURL(url)
        }
      } else {
        iframe.src = url
        iframe.onload = () => {
          iframe.onload = null
          iframe.contentWindow.print()
          URL.revokeObjectURL(url)
        }
      }
    } catch (err) {
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
        <li key={fileObj.id}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); // предотвращаем переход по ссылке
              getFileBlob(fileObj.base64, fileObj.type);
            }}
          >
            {fileObj.name}
          </a>
        </li>
      ))}
    </ul>
  );
}