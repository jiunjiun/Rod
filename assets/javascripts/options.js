$(function(){
  // http://stackoverflow.com/questions/3885817/how-to-check-that-a-number-is-float-or-integer
  function isInt(n){
    return Number(n) === n && n % 1 === 0;
  }

  init = function() {
    station_info = {}
    user_info    = {}

    if (localStorage['station_info']) station_info = JSON.parse(localStorage['station_info'])
    if (localStorage['user_info']) user_info = JSON.parse(localStorage['user_info'])

    $('#selectStartStation').val(station_info['selectStartStation']);
    $('#selectDestinationStation').val(station_info['selectDestinationStation']);

    $('#user_id').val(user_info['user_id']);
    $('#mobilePhone').val(user_info['mobilePhone']);
    $('#email').val(user_info['email']);

    $('.alert').hide();

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();


    if (station_info.date) {
      $('.datepicker').attr('data-value', station_info.date);
    } else {
      $('.datepicker').attr('data-value', yyyy + '/' + mm + '/' + dd);
    }
    $('.datepicker').pickadate({
      onClose: function() {
        $(document.activeElement).blur();
      }
    });

    pickatime_option = {
      min: [6, 00],
      max: [23, 30],
      format: 'HH:i',
      formatSubmit: 'HH:i',
      formatLabel: function(time) {
        var hours = ( time.pick - this.get('now').pick ) / 60,
          label = hours < 0 ? ' !小時前' : hours > 0 ? ' !小時後' : '現在'
        return  'HH:i <sp!an cl!ass="pull-r!ig!ht"><sm!all>' + ( hours ? Math.abs(hours) : '' ) + label +'</sm!all></sp!an>'
      },
      onClose: function() {
        $(document.activeElement).blur();
      }
    }

    start_time = $('.start_time').pickatime(pickatime_option);
    end_time   = $('.end_time').pickatime(pickatime_option);

    offset = [];
    limit = [];

    // Use the picker object directly.
    var start_picker = start_time.pickatime('picker');
    var end_picker   = end_time.pickatime('picker');

    start_picker.on({
      set: function(option) {
        limit_time = (option.select / 60)
        if (isInt(limit_time)) {
          limit = [parseInt(limit_time), 0]
        } else {
          limit = [parseInt(limit_time), 30]
        }

        end_picker.set('enable', true);
        end_picker.set('disable', [
          { from: [6, 00], to: limit }
        ]);
      }
    });

    if (station_info.start_time) {
      info_start_time = station_info.start_time.split(':');
      start_picker.set('select', [parseInt(info_start_time[0]), parseInt(info_start_time[1])]);
    }

    if (station_info.end_time) {
      info_end_time = station_info.end_time.split(':')
      end_picker.set('select', [parseInt(info_end_time[0]), parseInt(info_end_time[1])]);
    }
  }
  init()

  $('form').submit(function() {
    selectStartStation       = $('#selectStartStation').val();
    selectDestinationStation = $('#selectDestinationStation').val();
    date                     = $('input[name="date_submit"]').val();
    start_time               = $('input[name="start_time_submit"]').val();
    end_time                 = $('input[name="end_time_submit"]').val();

    user_id                  = $('#user_id').val();
    mobilePhone              = $('#mobilePhone').val();
    email                    = $('#email').val();

    station_info = {'selectStartStation': selectStartStation, 'selectDestinationStation': selectDestinationStation,
                    'date': date, 'start_time': start_time, 'end_time': end_time};
    user_info    = {'user_id': user_id, 'mobilePhone': mobilePhone, 'email': email};


    localStorage['station_info'] = JSON.stringify(station_info);
    localStorage['user_info']    = JSON.stringify(user_info);

    $('.alert').show();

    return false;
  })

  $('button.close').click(function(){
    $(this).parents('.alert').hide();
  });
});
