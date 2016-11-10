var app = angular.module("myApp");
app.directive('window', function(){
        
        return {
            restrict: 'E',
            scope: {
                myid: "=",
                nombre: "=",
                bg: "="
            },
          /*  Para llamar el ng-click adentro de la directiva
            controller: function($scope){
                $scope.close = fn;
            },*/
            templateUrl: 'app/directives/window/window.html',
            link: function(scope, element, attributes){
                element.addClass('bg-size');
              //  scope.close(attributes.myid);
               
        }
        };
        
});
    
