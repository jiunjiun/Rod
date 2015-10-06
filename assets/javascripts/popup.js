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
    switch(page_status) {
    case 'Step01':
      chrome.runtime.sendMessage({method: 'getData'},function(response){
        if (response) {
          $('img').attr('src', 'https://irs.thsrc.com.tw' + response.captcha_img);
          $('#Step01').removeClass('hide');
        }
      });
      break;
    case 'Step02':
    case 'Step03':
    case 'Step04':
      $('.buying').removeClass('hide');
      break;
    }
  }

  $('form button').click(function() {
    captcha_code = $('#captcha').val();

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {method:'start', captcha_code: captcha_code});
    });

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
    return false;
  });
});
