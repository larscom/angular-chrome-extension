chrome.runtime.onMessage.addListener((request, sender, respond) => {
  const handler = new Promise((resolve, reject) => {
    if (request) {
      resolve('Hi from contentPage :)');
    } else {
      reject('request is empty.');
    }
  });

  handler.then(message => respond(message)).catch(error => respond(error));

  return true;
});
