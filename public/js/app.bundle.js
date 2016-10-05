webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var angular = __webpack_require__(1);
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
	__webpack_require__(3);
	__webpack_require__(6)

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	(function (){
	    
	    var angular = __webpack_require__(1);
	    
	    var app = angular.module("myApp");
	    /* Directiva con webpack de la ventana default*/
	    app.directive('windowCard', __webpack_require__(4)());
	    /* Directiva del Panel de Control ejecutandose*/
	    app.directive('panelControl', __webpack_require__(5)());

	    
	}());    
	    


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function() {
	    
	    var WindowDirective = function() {
	        
	        return {
	            restrict: 'E',
	            templateUrl: 'app/directives/window/window.html',
	            replace: true
	        };
	        
	    };
	    
	    return WindowDirective;
	    
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function() {
	    
	    var PanelDirective = function() {
	        
	        return {
	            restrict: 'E',
	            templateUrl: 'app/directives/panel-control/panel.html',
	            replace: true
	        };
	        
	    };
	    
	    return PanelDirective;
	    
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	(function (){
	    
	    var angular = __webpack_require__(1);
	    
	    var app = angular.module("myApp");
	    app.factory('staticData', __webpack_require__(7)());
	    
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


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function () {

	    function staticData ($http) {
	        
	        var factory = {};
	    
	       factory.getData = function (cb, error) {
	            return $http.get('./app/data/data.json').then(cb, error);
	        }
	        return factory;
	        
	    }
	    
	    staticData.$inject = ['$http'];
	    
	    return staticData;
	    
	}

/***/ }
]);