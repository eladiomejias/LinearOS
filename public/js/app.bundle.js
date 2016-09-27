webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var angular = __webpack_require__(1);
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


/***/ }
]);