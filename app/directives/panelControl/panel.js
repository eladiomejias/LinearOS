var app = angular.module("myApp");
app.directive('myPanel', function(){
        
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'app/directives/panelControl/panel.html',
        };
        
});
    
