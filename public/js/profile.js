'use strict';

$(document).ready(init);

function init() {
  $('#addItem').click(addItem);
  $('#ownedItems').on('click','.thumbnail',toTrade);
  $('#ownedItems').on('click','#cancel',cancel);
  $('#acceptOffer').click(acceptOffer);
  $('#declineOffer').click(decline);
  $('#ownedItems').on('click','#remove',remove);
}

function toTrade (e) {
  if($(e.target).closest('.item').hasClass('disabled')) return;

  var id = $(e.target).closest('.item').attr('id');
  if(window.confirm('Up for trade?')){
    $.ajax({
      url:'/profile/newtrade',
      type:'PUT',
      data:{_id: id}
    }).done(function (data){
      $(e.target).closest('.item').addClass('disabled');
    });
  }
}

function addItem () {
  var item = {};
  item.name = $('#itemName').val();
  var $itemDisp = $('#sampleItem').clone();
  $itemDisp.attr('id', '').removeClass('hide');
  $itemDisp.find('.caption').text(item.name);

  $.ajax({
      url:'/profile/newitem',
      type:'POST',
      data:item
  }).done(function(data) {
      console.log(data);
    $itemDisp.attr('id', data);  
    $('#ownedItems').append($itemDisp);   
    $('#ownedItems').on('click','.thumbnail',toTrade);
    $('#ownedItems').on('click','#cancel',cancel);
    $('#ownedItems').on('click','#remove',remove);
  });
  //inside done
}

function acceptOffer (e) {
  var transId = $(e.target).closest('tr').attr('id');
  console.log(transId);
  $.post('/transaction/accept', {_id:transId}).done(function (data){
    console.log(data);
    $(e.target).closest('tr').remove();
  })
}

function cancel (e) {
  var id = $(e.target).closest('.item').attr('id');
  $.post('/transaction/cancel', {_id:id}).done(function (data){
    $(e.target).closest('.item').removeClass('disabled');
  })
}

function decline (e){
  var transId = $(e.target).closest('tr').attr('id');
  $.post('/transaction/decline', {_id:transId}).done(function (data){
    console.log(data);
    $(e.target).closest('tr').remove();
  })
}

function remove (e){
  var id = $(e.target).closest('.item').attr('id');
  $.post('/profile/delete', {_id:id}).done(function (data){
    $(e.target).closest('.item').remove();
  })
}