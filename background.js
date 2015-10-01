// background.js
var data;
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  var tabId = sender.tab ? sender.tab.id : message.tab

  switch(message.method) {
  case 'setData':
    data = message.data;
    break;
  case 'getData':
    sendResponse(data);
    break;
  case 'getInfo':
    station_info = {}
    user_info    = {}
    if (localStorage['station_info']) station_info = JSON.parse(localStorage['station_info'])
    if (localStorage['user_info']) user_info = JSON.parse(localStorage['user_info'])

    info = {station: station_info, user: user_info};
    sendResponse(info);
    break;
  case 'pageAction_show':
    chrome.pageAction.show(tabId);
    break;
  case 'pageAction_hide':
    chrome.pageAction.hide(tabId);
    break;
  }
});

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
// });


// chrome.runtime.onConnect.addListener(function(port) {
//   console.log('content addListener', port);
//   console.assert(port.name == "knockknock");
//   port.onMessage.addListener(function(msg) {
//     console.log('content onMessage addListener', msg);
//   //   if (msg.joke == "Knock knock")
//   //     port.postMessage({question: "Who's there?"});
//   //   else if (msg.answer == "Madame")
//   //     port.postMessage({question: "Madame who?"});
//   //   else if (msg.answer == "Madame... Bovary")
//   //     port.postMessage({question: "I don't get it."});
//   });
// });
