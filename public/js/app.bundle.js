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


/***/ }
]);