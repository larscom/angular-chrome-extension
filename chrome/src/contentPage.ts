chrome.runtime.onConnect.addListener(port => {
  console.log('connected ', port);
  port.onMessage.addListener((message, port)=>{
    port.postMessage("Hi from contentPage :)");
  });
  
});