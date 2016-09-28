var angular = require('angular');
var app = angular.module('myApp',['ngMaterial', 'ngMessages', 'ui.router', 'ngDragDrop']);

app.config(function($mdThemingProvider, $mdIconProvider){
    $mdThemingProvider.theme('default')
    .primaryPalette('blue', {
        'default': '600'
    })
    .accentPalette('pink', {
        'default': '400'
    });
    /* $mdIconProvider.iconSet("avatar", 'scripts/material-icons.svg', 128); */
    
      $(document).ready(function(){
    
  $( function() {
   $(".draggable").draggable({ containment: 'window'}).position({my:"center", at:"center", of:window});
   $( ".draggable" ).resizable();});
   
   $(".dialog").dialog();
  
});
   
});

/* requires */
require("./directives");