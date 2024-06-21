chrome.runtime.onMessage.addListener((request, _, cb) => {
  const handler = new Promise<string>((resolve, reject) => {
    if (request) {
      resolve(`Hi from contentPage! You are currently on: ${window.location.href}`)
    } else {
      reject('request is empty.')
    }
  })

  handler.then((message) => cb(message)).catch((error) => cb(error))

  return true
})
