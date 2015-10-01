$(function(){
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
  }
  init()

  $('form').submit(function() {
    selectStartStation       = $('#selectStartStation').val();
    selectDestinationStation = $('#selectDestinationStation').val();

    user_id                  = $('#user_id').val();
    mobilePhone              = $('#mobilePhone').val();
    email                    = $('#email').val();


    station_info = {'selectStartStation': selectStartStation, 'selectDestinationStation': selectDestinationStation}
    user_info    = {'user_id': user_id, 'mobilePhone': mobilePhone, 'email': email}

    localStorage['station_info'] = JSON.stringify(station_info)
    localStorage['user_info']    = JSON.stringify(user_info)

    $('.alert').show();

    return false;
  })

  $('button.close').click(function(){
    $(this).parents('.alert').hide();
  });
});
