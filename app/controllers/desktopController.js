var app = angular.module("myApp");

// Basic controller for the aplication
app.controller('desktopController', function ($scope, $compile, staticData){
    
    //demo scopes
    $scope.hello = "Linear OS";
    $scope.close = close;
    
    $scope.really = "really";
    
    //animation scope
    $scope.animation = false;
    $scope.menuAnimation = false;
    
    // sized window
    $scope.classNamed = false;
    
    $scope.whatsup = "holaaa";
    
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
    
  
    $scope.addProgram = function(programaId){
        
        // Creating the container of the window
       var thing =  $('<div/>').attr({
            'class': 'ui-widget-content md-whiteframe-5dp draggable default-win custom-position',
            'style': 'width:' + $scope.myData.programas[2].width + 'px ; height: ' + $scope.myData.programas[2].height + 'px'
        }).draggable().insertAfter("#menu");
            
        $(thing).resizable();
        
        
        
        // Creating the directive to append in the container    
        
       /* var win = angular.element(document.createElement('window'));
        var el = $compile( win )( $scope );
        //where do you want to place the new element?
         angular.element(thing).append(win);*/
        var win = angular.element(document.createElement('window'));
        var named = "'"+ $scope.myData.programas[4].nombre+"'";
        console.log(named);
        // The actually index
        var el = $compile("<window ng-click=\'hi()\' nombre=\'myData.programas["+2+"].nombre\' bg=\'myData.programas["+2+"].bgLink\'>></window>")($scope);
        angular.element(thing).append(el);
        
        
    }
    
    $scope.hi = function(){
        console.log("hii");
    }
    
});
    