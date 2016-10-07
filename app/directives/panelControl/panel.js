var app = angular.module("myApp");
app.directive('myPanel', function(){
        
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'app/directives/panelControl/panel.html',
        };
        
});
    
