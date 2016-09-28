/* Scripts for view */
/*global $ */
$(document).ready(function(){
    
    $( function() {
  $("#draggable").draggable({ containment: 'window'}).position({my:"center", at:"center", of:window});
  $( "#draggable" ).resizable();
  } );
});