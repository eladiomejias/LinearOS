var app = angular.module("myApp");
app.directive('window', function(){
        
        return {
            restrict: 'E',
            scope: {
                id: "=",
                nombre: "=",
                bg: "="
            },
            templateUrl: 'app/directives/window/window.html',
        };
        
});
    
