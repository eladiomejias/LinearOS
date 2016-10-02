var app = angular.module("myApp");

// Basic controller for the aplication
app.controller('desktopController', function ($scope){
    
    //demo scopes
    $scope.hello = "Linear OS";
    $scope.close = close;
    
    //animation scope
    $scope.animation = false;
    $scope.menuAnimation = false;
    
    // sized window
    $scope.classNamed = "normal";
    
    $scope.changeWindowSize = function(){
       if ($scope.classNamed === "normal")
            $scope.classNamed = "all";
        else
            $scope.classNamed = "normal";
    }
    
    function close(event){
        //Fix this, hide or something else
        var button = $(event.target),
            parent = button.parent().parent().parent().parent().parent().remove();
        console.log(parent);
        
    }
    
  
    
    
});