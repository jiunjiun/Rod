var captcha_code;
var info = {};

$(function() {
  captcha_img = $('#BookingS1Form_homeCaptcha_passCode').attr('src')
  chrome.runtime.sendMessage({method:'pageAction_show'});
  chrome.runtime.sendMessage({method:'setData', data: {captcha_img: captcha_img}});

  chrome.runtime.sendMessage({method: 'getInfo'},function(response){
    if (response) info = response;
  });

  chrome.extension.onMessage.addListener(function(message,sender,sendResponse){
    switch(message.method) {
    case 'start':
      captcha_code = message.captcha_code;
      step_1();
      break;
    }
  });

  function step_1() {
    $('input[name="homeCaptcha:securityCode"]').val(captcha_code);
    $('select[name="selectStartStation"]').val(info.station.selectStartStation);
    $('select[name="selectDestinationStation"]').val(info.station.selectDestinationStation);
    $('select[name="toTimeTable"]').val('600A');

    localStorage['stup'] = 1;

    $('#SubmitButton').trigger('click');
  }

  function step_2() {

  }

  function step_3() {

  }

});


