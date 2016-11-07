var app = angular.module("myApp");
app.directive('window', function(){
        
        return {
            restrict: 'E',
            scope: {
                myid: "=",
                nombre: "=",
                bg: "="
            },
            templateUrl: 'app/directives/window/window.html',
            link: function(scope, element, attributes){
                element.addClass('bg-size');
               
        }
        };
        
});
    
