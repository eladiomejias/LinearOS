var angular = require('angular');
var app = angular.module('myApp',['ngMaterial', 'ngMessages', 'ui.router', 'ngDragDrop']);

app.config(function($mdThemingProvider, $mdIconProvider){
    $mdThemingProvider.theme('default')
    .primaryPalette('blue', {
        'default': '900'
    })
    .accentPalette('pink', {
        'default': '400'
    });
    /* $mdIconProvider.iconSet("avatar", 'scripts/material-icons.svg', 128); */
    
    $(document).ready(function(){
    
              $( function() {
                  
                 /* Custom window */
               $(".draggable").draggable({ containment: 'window'}).position({my:"center", at:"center", of:window});
               $( ".draggable" ).resizable();
                /* Panel Control*/
                $(".panel").draggable({ containment: 'window'}).position({my:"center", at:"center", of:window});
               $( ".panel" ).resizable();
                  
              });
               
               $(".dialog").dialog();
              
            });
   
});

/* requires */
require("./directives");