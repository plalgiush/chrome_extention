import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../../services/db/db"
import { printFile } from "../../utils/printing"

export function FilesList() {
  const files = useLiveQuery(() => db.files.toArray())

  return (
    <ul style={{ display: 'flex', 'flexDirection': 'column', 'alignItems':  'start', 'list-style-type': 'none'}}>
      {files?.map((fileObj) => (
        <li key={fileObj.id}
          onClick={() => {printFile(fileObj.base64)}}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          {fileObj.name}
        </li>
      ))}
    </ul>
  )
}