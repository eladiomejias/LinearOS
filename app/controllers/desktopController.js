var app = angular.module("myApp");

// Basic controller for the aplication
app.controller('desktopController', function ($scope){
    
    $scope.hello = "Linear OS";
    $scope.close = close;
    
    $scope.animation = false;
    $scope.menuAnimation = false;
    
    function close(event){
        //Fix this, hide or something else
        var button = $(event.target),
            parent = button.parent().parent().parent().parent().parent().remove();
        console.log(parent);
        
    }
    
  
    
    
});