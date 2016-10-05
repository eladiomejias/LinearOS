(function (){
    
    var angular = require('angular');
    
    var app = angular.module("myApp");
    app.factory('staticData', require('./staticData.js')());
    
}());    
    
    
// (function (){
    
//     var angular = require('angular');
    
//     var app = angular.module("myApp");
//     app.factory('staticData', function($http) {
        
//         var factory = {};
    
//       factory.getData = function () {
//             return $http.get('../data/data.json');
//         }
        
//         return factory;
        
//     });
    
// }());   
