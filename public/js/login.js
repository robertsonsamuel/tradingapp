'use strict';

$(function(){
  $('#login').click(login);
})

function login(e) {
  e.preventDefault();
  console.log('login');

  var username = $('#username').val();
  var pw = $('#pw').val();

  $.post('/login', {username: username, password: pw})
  .done(function(data){
    window.location.replace('/members');
  })
  .fail(function(err){
    $('#username').val('');
    $('#pw').val('');
    //swal('Error:', err, 'error');
  });
}