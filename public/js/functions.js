/* Scripts for view */
/*global $ */
$(document).ready(function(){
    
    $( function() {
  $("#draggable").draggable({ containment: 'window',  position: [0,28]});
  $( "#draggable" ).resizable();
  } );
});