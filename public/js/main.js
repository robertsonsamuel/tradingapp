'use strict';

$(document).ready(init);

function init() {
  $('#logout').click(logout);
}

function logout() {
  $.get('/auth/logout').done(function (data){
    window.location.replace('/');
  });
}