chrome.runtime.onMessage.addListener((request, sender, respond) => {
  const handler = new Promise((resolve, reject) => {
    if (request) {
      resolve('Hi from contentPage :)');
    } else {
      reject('request is empty.');
    }
  });

  handler
    .then(response => sendResponse(respond, response))
    .catch(error => sendResponse(respond, error));

  return true;
});

const sendResponse = (respond: (message: any) => void, response: any) => respond(response);
