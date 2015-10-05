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
