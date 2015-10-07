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
  case 'setTHSR_Info':
    old_info = {};
    if (localStorage['THSR_Info']) old_info = JSON.parse(localStorage['THSR_Info']);

    new_info = message.data;
    info     = $.extend(old_info, new_info);

    localStorage['THSR_Info'] = JSON.stringify(info);
    break;
  case 'getTHSR_Info':
    info = {}
    if (localStorage['THSR_Info']) info = JSON.parse(localStorage['THSR_Info']);
    sendResponse(info);
    break;
  }
});
