'use strict';

$(document).ready(init);

function init() {
  $('#addItem').click(addItem);
  $('#ownedItems').on('click','.item',toTrade);
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
      addRow(data);

    });
  }
}

function addRow(transaction) {
  console.log(transaction);
  var trSample = $('.toClone').clone();
  trSample.attr('id', transaction._id).removeClass('hide toClone');
  trSample.children('#currentItem').text(transaction.forTrade.name);
  $('#offerTable').append(trSample);
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
  });
  //inside done
}