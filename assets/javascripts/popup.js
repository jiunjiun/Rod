$(function() {
  // chrome.extension.getBackgroundPage().console.log();
  var page_status;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {method: 'page_status'}, function(response) {
      page_status = response;
      show_view();
    });
  });

  function show_view() {
    var THSR_status;
    chrome.runtime.sendMessage({method: 'getTHSR_Info'},function(response){
      THSR_status = response.status;
      if (THSR_status == undefined) THSR_status = 'stop';

      if (THSR_status == 'start') {
        $('.buying').removeClass('hide');
      } else if (page_status == 'Step01' && THSR_status == 'stop') {
        chrome.runtime.sendMessage({method: 'getData'},function(response){
          if (response) {
            $('img').attr('src', 'https://irs.thsrc.com.tw' + response.captcha_img);
            $('#Step01').removeClass('hide');
          }
        });
      }
    });
  }

  $('form button').click(function() {
    captcha_code = $('#captcha').val();

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {method:'start', captcha_code: captcha_code});
    });

    window.close();
    return false;
  });

  $("form input").keypress(function(event) {
    if (event.which == 13) {
      $('form button').trigger('click');
    }
  });

  $('.buying button').click(function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {method: 'stop_buying'});
    });

    window.close();
    return false;
  });
});
