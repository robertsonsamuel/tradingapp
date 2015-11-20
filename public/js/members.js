'use strict';

$(document).ready(init);

var itemChosen;

function init() {
  $('.allItems').on('click','.itemContainer', launchModal);
  $('.makeOffer').click(makeOffer);
}

function launchModal (e) {
  itemChosen = $(e.target).closest('.itemContainer').attr('id');
 $('#itemModal').modal({show:true});
}


function makeOffer (e) {
  var idx = document.getElementById('sel1').selectedIndex;
  var id = $(document.getElementById('sel1').options[idx]).attr('class');
  $.post('/transaction', {forTrade: itemChosen, offered: id}).done(function (data){
    console.log(data);
    window.location.reload();

  })
}