(function (){
    
    var angular = require('angular');
    
    var app = angular.module("myApp");
    /* Directiva con webpack */
    app.directive('windowCard', require('./window/window.js')());
    
}());    
    
