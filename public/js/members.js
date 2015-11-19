'use strict';

$(document).ready(init);

function init() {
$('.allItems').on('click','.itemContainer', launchModal);
}

function launchModal () {
  console.log('clicked')
 $('#itemModal').modal({show:true});
}


function makeOffer (e) {
  var itemId = $(e.target).attr('id');

}