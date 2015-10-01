$(function() {
  chrome.runtime.sendMessage({method: 'getData'},function(response){
    if (response) {
      //response is now the info collected by the content script.
      $('img').attr('src', 'https://irs.thsrc.com.tw' + response.captcha_img)
    }
  });

  $('form button').click(function() {
    captcha_code = $('#captcha').val();

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {method:'start', captcha_code: captcha_code});
    });

    return false;
  });
});
