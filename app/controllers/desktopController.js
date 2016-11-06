var app = angular.module("myApp");

// Basic controller for the aplication
app.controller('desktopController', function ($scope, $compile, staticData){
    
    //demo scopes
    $scope.hello = "Liner OS";

    //animation scope
    $scope.animation = false;
    $scope.menuAnimation = false;
    
    // sized window
    $scope.classNamed = false;
    
    // init the data json $scope
    $scope.myData;
    
    // getting data to $scope
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
    });
    
    */
    
    
    $scope.changeWindowSize = function(){
       if ($scope.classNamed === true)
            $scope.classNamed = false;
        else
            $scope.classNamed = true;
    }
    
    // close program if open
    function close(event){
        //fix this, hide or something else
        var button = $(event.target),
            parent = button.parent().parent().parent().parent().parent().remove();
        console.log(parent);
        
    }
  
    $scope.openProgram = function(nombreId, activeValue){
        
        if(activeValue == false){

                //console.log(nombreId);
                
                // function to search the index
                var index = searchId(nombreId);
                
                //console.log(index);
                
                // creating the container of the window
               var thing =  $('<div/>').attr({
                    'class': 'ui-widget-content md-whiteframe-10dp draggable default-win custom-position',
                    'id': ''+nombreId,
                    'style': 'width:' + $scope.myData.programas[index].width + 'px ; height: ' + $scope.myData.programas[index].height + 'px'
                }).draggable().appendTo("#after-this");
                    
                $(thing).resizable();
            
                // creating the directive to append in the container    
                var win = angular.element(document.createElement('window'));
                
                // the actually index
                var el = $compile("<div class=\'new-border\' ng-click=\'closed()\' layout='row' layout-align='center center'><div layout='row' flex='95' layout-align='center center'><span class='name-btn'>"+$scope.myData.programas[index].nombre+"</span><span flex='90'></span>"
                +"<div class='removed' ng-click='closeProgram()'></div>"
                +"</div></div>"+"<window ng-click=\'hi()\' nombre=\'myData.programas["+index+"].nombre\' bg=\'myData.programas["+index+"].bgLink\' myId=\'myData.programas["+index+"].id\'></window>")($scope);
                angular.element(thing).append(el);

                $("#"+nombreId).addClass("active-icon");                
                $scope.myData.programas[index].active = true;
            
        }else{
            
            console.log("Error program open");
            
        }
        
       
        
        
    }
    
    // function to look who is the index of the program that will be open
    function searchId(nombreId){
        
        var tam = $scope.myData.programas.length;
        var index = 0;
        //console.log(tam);
        for(var i = 0; i<tam; i++){
            if($scope.myData.programas[i].id == nombreId){
                index = i;
            }
        }
        
        return index;
        
    }
    
    $scope.closeProgram = function(){
        console.log("Cerrando programa");
    }
    
    
});
    