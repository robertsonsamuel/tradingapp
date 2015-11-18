'use strict';

$(document).ready(init);

var targetRoom;

function init() {
  $('.addRoom').click(addARoom);
  $('.rooms').click(eventRouter);
  $('.addItem').click(addAnItem);
  $('.table').click(eventRouter);
  if ($('.rooms').children().length >1){
    $('.rooms').removeClass('hide');
  }
}

function addARoom (){
  var room = $('#roomInput').val();
  $('#roomInput').val('');
  var div = createRoom(room);
  $.post('/rooms', {roomName: room}).done(function(data){
    div.attr('id', data);
    $('.rooms').append(div).removeClass('hide');  
  });
};

function createRoom (room){
  var header = $(document.createElement('h3'));
  header.text(room).attr('class', 'room');
  var btn = $(document.createElement('button'));
  var span = $(document.createElement('span'));
  var div = $(document.createElement('div'));
  div.attr('class', 'roomContainer');
  btn.attr('class', 'killRoom btn btn-danger');
  span.attr('class', 'glyphicon glyphicon-remove');
  btn.append(span);
  div.append(header);
  div.append(btn);
  return div;
}

function eventRouter (e){
  if ($(e.target).hasClass('room')){
    targetRoom = $(e.target).parent().attr('id')
    openSesame();
  }
  if ($(e.target).hasClass('killRoom')){
    removeRoom(e);
  }
  if ($(e.target).hasClass('del')){
    deleteItem(e);
  }
  // if ($(e.target).hasClass('edit')){
  //   editItem(e);
  // }
}

function removeRoom (e){
  var dbId = $(e.target).closest('.roomContainer').attr('id');
  console.log(dbId);
  if (window.confirm('Delete your Room?')){
    $.ajax({
    url: '/'+dbId,
    method: 'DELETE',
    success: function(result) {
      $(e.target).closest('.roomContainer').remove();
      if ($('.rooms').children().length<=1){
        $('.rooms').addClass('hide');
      }
    }
    });    
  }
}

function openSesame(){
  $('.itemRows').remove();
  $.get('/rooms/'+targetRoom).done(function (data){
    if (data[0]){
      for (var i =0; i<data[0].items.length; i++){
        var row = cloneRow(data[0].items[i].name, data[0].items[i].value);
        row.attr('id', data[0].items[i]._id);
        $('tbody').append(row);
      }
    }
  });
  $('#itemModal').modal({show:true});
}

function addAnItem (){
  var item = $('.itemInput').val();
  var value = $('.itemValue').val();
  $('.itemInput').val('');
  $('.itemValue').val('');
  var row = cloneRow(item, value);
  $.post('/items', {name: item, value: value}).done(function (data){
    var dataObject = {roomId: targetRoom, itemId: data};
    $.ajax({
    url: '/rooms',
    method: 'PUT',    
    data: dataObject,
    // dataType: 'json',
    success: function(data) {
      row.attr('id', data);
      $('tbody').append(row);
    }
    });
  });
}

function cloneRow (item, value){
  var row = $('.forClone').clone();
  row.removeClass('forClone');
  row.addClass('itemRows')
  row.find('.item').text(item);
  row.find('.value').text(value);
  return row;
}

function deleteItem (e){
  var dbId =$(e.target).closest('tr').attr('id');
  if (window.confirm('Permanently Delete This Item?')){
    $.ajax({
    url: '/items/'+dbId,
    method: 'DELETE',
    success: function(result) {
      $(e.target).closest('tr').remove();
    }
    });
  }
}

// function editItem (e){
//   var dbId =$(e.target).closest('tr').attr('id');
//   var dataObject={id:dbId, name: }
//   $.ajax({
//   url: '/items',
//   method: 'PUT',
//   data: dataObject,
//   success: function(result) {
//     $(e.target).closest('tr').remove();
//   }
//   });
// }