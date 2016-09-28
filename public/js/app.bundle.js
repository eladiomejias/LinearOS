webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var angular = __webpack_require__(1);
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
	__webpack_require__(6);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	(function (){
	    
	    var angular = __webpack_require__(1);
	    
	    var app = angular.module("myApp");
	    /* Directiva con webpack */
	    app.directive('windowCard', __webpack_require__(7)());
	    
	}());    
	    


/***/ },
/* 7 */
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


/***/ }
]);