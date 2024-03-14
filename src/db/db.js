import Dexie from 'dexie'

export const db = new Dexie('FilesDB')
db.version(1).stores({
  files: '++id'
})
db.open().catch((err) => {
    console.log(err.stack || err)
})