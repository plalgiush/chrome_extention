import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/db";

export function FilesList() {
    const files = useLiveQuery(() => db.files.toArray())

    const getFileBlob = async(file) => {
        console.log(file)
        fetch(file)
        .then(res => {res.blob(); console.log(res)})
        .then(blob => {
            const file = new File([blob], "File name",{ type: "application/pdf" })
            const url = URL.createObjectURL(file)
            console.log(url)
            // window.open(url)
        })
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