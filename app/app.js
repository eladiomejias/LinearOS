var angular = require('angular');
var app = angular.module('myApp',['ngMaterial', 'ngMessages', 'ui.router']);


app.config(function($mdThemingProvider, $mdIconProvider){
    $mdThemingProvider.theme('default')
    .primaryPalette('blue', {
        'default': '600'
    })
    .accentPalette('pink', {
        'default': '400'
    });
    /* $mdIconProvider.iconSet("avatar", 'scripts/material-icons.svg', 128); */
});
