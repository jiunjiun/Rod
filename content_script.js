var captcha_code;
var info = {};
var page_status;
var url_search;

$(function() {
  chrome.extension.onMessage.addListener(function(message,sender,sendResponse) {
    switch(message.method) {
    case 'start':
      localStorage['THSR_captcha_code'] = message.captcha_code;
      localStorage['THSR_training']     = 'training';

      runner();
      break;
    case 'page_status':
      sendResponse(page_status);
      break;
    case 'stop_buying':
      stop_runner();
      break;
    }
  });

  init();
  function init() {
    captcha_img = $('#BookingS1Form_homeCaptcha_passCode').attr('src');
    chrome.runtime.sendMessage({method:'pageAction_show'});
    chrome.runtime.sendMessage({method:'setData', data: {captcha_img: captcha_img}});

    chrome.runtime.sendMessage({method: 'getInfo'},function(response) {
      if (response) {
        info = response;
        _page_status();
        runner();
      }
    });
  }

  function _page_status() {
    step_class = $('#steps span strong').parent().attr('class');
    switch(step_class) {
    case 'Step01':
    case 'Step02':
    case 'Step03':
    case 'Step04':
      page_status = step_class;
      break;
    default:
      page_status = '';
    }
  }

  function runner() {
    if (localStorage['THSR_training'] != 'finish') training_page();

    check_error();
    if (localStorage['THSR_status'] == 'start') {
      switch(page_status) {
      case 'Step01':
        step_1();
      case 'Step02':
        step_2();
      case 'Step03':
        step_3();
      case 'Step04':
        step_4();
        break;
      default:
        stop_runner();
      }
    }
  }

  function training_page() {
    switch(localStorage['THSR_training']) {
    case 'training':
      localStorage['THSR_training'] = 'trained';
      $('#SubmitButton').trigger('click');
      break;
    case 'trained':
      localStorage['THSR_training'] = 'finish';
      localStorage['THSR_params'] = location.search;
      localStorage['THSR_status'] = 'start';
      break;
    }
  }

  function check_error() {
    if ($('.feedbackPanelERROR').length) {
      switch(page_status) {
      case 'Step01':

        break;
      case 'Step02':
      case 'Step03':
      case 'Step04':
        window.history.back();
        break;
      default:
        stop_runner();
        alert('頁面錯誤!!');
      }
    }
  }

  function step_1() {
    if (page_status != 'Step01') return false;
    // console.log(' -- step 1 --');

    $('select[name="selectStartStation"]').val(info.station.selectStartStation);
    $('select[name="selectDestinationStation"]').val(info.station.selectDestinationStation);
    $('#toTimeInputField').val(info.station.date);
    $('select[name="toTimeTable"]').val(get_start_time_code(info.station.start_time));
    $('input[name="homeCaptcha:securityCode"]').val(localStorage['THSR_captcha_code']);

    localStorage['THSR_status'] = 'start';

    $('#SubmitButton').trigger('click');
  }

  function step_2() {
    if (page_status != 'Step02') return false;
    // console.log(' -- step 2 --');

    $('.table_simple:eq(0) tr').each(function(i) {
      if (i == 0) return true;

      $('.table_simple:eq(0) tr:eq('+ i +') input:radio').attr("checked", true);
      first_train_time = parseInt($('.table_simple tr:eq('+ i +') td:eq(3) span').html().replace(':', ''));

      station_start_time = parseInt(info.station.start_time.replace(':', ''));
      station_end_time   = parseInt(info.station.end_time.replace(':', ''));

      if ( first_train_time >= station_start_time && first_train_time <= station_end_time) {
        $('input[name="SubmitButton"]').trigger('click');
        return false;
      } else {
        window.location.href = "https://irs.thsrc.com.tw/IMINT/" + localStorage['THSR_params'];
      }
    });
  }

  function step_3() {
    if (page_status != 'Step03') return false;
    // console.log(' -- step 3 --');

    $('#idNumber').val(info.user.user_id);
    $('#mobileInputRadio').attr("checked", true);
    $('#mobilePhone').val(info.user.mobilePhone);
    $('#name2622').val(info.user.email);
    $('input[name="agree"]').attr("checked", true);

    $('input#isSubmit').trigger('click');
  }

  function step_4() {
    if (page_status != 'Step04') return false;
    // console.log(' -- step 4 --');

    alert('訂票完成!!');
  }

  function stop_runner() {
    localStorage['THSR_status'] = 'stop';
  }

  function get_start_time_code(start_time) {
    info_start_time = start_time.split(':');
    if (info_start_time[0] == 12) {
      start_time_code = info_start_time[0] + info_start_time[1] + 'N'
    } else if (info_start_time[0] / 12 > 1) {
      start_time_code = (parseInt(info_start_time[0]) - 12) + info_start_time[1] + 'P'
    } else {
      start_time_code = parseInt(info_start_time[0]) + info_start_time[1] + 'A'
    }
    return start_time_code;
  }
});


