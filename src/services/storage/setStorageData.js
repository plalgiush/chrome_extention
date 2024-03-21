export const setStorageData = async(action, getingFile, base64) => {
  console.log('setStorage', action)

  try {
    const response = await fetch(base64)
    const blob = await response.blob()

    chrome.storage.local.set({ "fileObj" : { name: getingFile, url: response.url, type: blob.type} }, function() {
      chrome.runtime.sendMessage({ action })

      if (chrome.runtime.error) {
        console.log("Runtime error.")
      }
    })
  } catch(err) {
    console.error(err)
  }
}
