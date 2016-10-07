var app = angular.module("myApp");

// Basic controller for the aplication
app.controller('desktopController', function ($scope, staticData){
    
    //demo scopes
    $scope.hello = "Linear OS";
    $scope.close = close;
    
    $scope.really = "really";
    
    //animation scope
    $scope.animation = false;
    $scope.menuAnimation = false;
    
    // sized window
    $scope.classNamed = false;
    
    $scope.myData;
    
    //data
    staticData.getData().success(function(theData){
        
        $scope.myData = theData;
        
    }).error(function(error){
    
        console.log(error);
    
    });
    
    /*
    staticData.getData(function (result) {
        $scope.myData = result.data;
        console.log($scope.myData.nombre);
    }, function (error) {
        console.log(error)
    });*/
    
    
    $scope.changeWindowSize = function(){
       if ($scope.classNamed === true)
            $scope.classNamed = false;
        else
            $scope.classNamed = true;
    }
    
    function close(event){
        //Fix this, hide or something else
        var button = $(event.target),
            parent = button.parent().parent().parent().parent().parent().remove();
        console.log(parent);
        
    }
    
    
   $scope.openProgram = function(id, active){
       
        $scope.hello = "Panel";
        
        console.log(id);
    }
    
  
    
    
});
    