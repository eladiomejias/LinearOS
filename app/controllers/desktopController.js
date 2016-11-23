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
    
    //Code for program open
    var add = "-program";
    
    //var for deadlock
    $scope.inProcess = [];
    
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
    
  
    $scope.openProgram = function(nombreId, activeValue){
        
        if(activeValue == false){

                //console.log(nombreId);
                
                // function to search the index
                var index = searchId(nombreId);
                
                // my created id
                var createdId = nombreId;
                createdId += add;
            
                var valor = verificar(index);
                console.log(valor);
                if(valor){
                     // creating the container of the window
               var thing =  $('<div/>').attr({
                    'class': 'ui-widget-content md-whiteframe-10dp draggable default-win custom-position',
                    'id': ''+createdId,
                    'style': 'width:' + $scope.myData.programas[index].width + 'px ; height: ' + $scope.myData.programas[index].height + 'px'
                }).draggable().appendTo("#after-this");
                    
                $(thing).resizable();
            
                // creating the directive to append in the container    
                var win = angular.element(document.createElement('window'));
                
                // the actually index
                var el = $compile("<div class=\'new-border\' layout='row' layout-align='center center'><div layout='row' flex='95' layout-align='center center'><span class='name-btn'>"+$scope.myData.programas[index].nombre+"</span><span flex='90'></span>"
                +"<div class='removed' ng-click='closeProgram("+index+")'></div>"
                +"</div></div>"+"<window ng-click=\'hi()\' nombre=\'myData.programas["+index+"].nombre\' bg=\'myData.programas["+index+"].bgLink\' myid=\'myData.programas["+index+"].id\'></window>")($scope);
                angular.element(thing).append(el);
                
                    $("#"+nombreId).addClass("active-icon");                
                    $scope.myData.programas[index].active = true;
                    
                    // Inicializar si todo corrio perfecto
                    $scope.myData.programas[index].stats = "activo";
                }
               
                
            
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
    
   $scope.closeProgram = function(index){
        // enter in the close programs
       console.log("Borrar programa");
       var search = $scope.myData.programas[index].id;
       var searchIndexProgram = search;
       searchIndexProgram += add;
       // calls this
       $("#"+searchIndexProgram).remove();
       // remove class
       $("#"+search).removeClass("active-icon");
       // it's no longer act
       // so we change the scope value
       $scope.myData.programas[index].active = false;
       $scope.myData.programas[index].stats = "apg";


        
    }
    
    // verificar requerimiento
    function verificar(index){
       var programa =  $scope.myData.programas[index];
       var band = true;
       
       if($scope.inProcess.length == 0){
           console.log("Primera vez");
           programa.req.forEach(
               function(item, index){
                   $scope.inProcess.push(item);
               }
            );
       }else{
           console.log("Segunda");
            $scope.inProcess.forEach(function(item, index){
               programa.req.forEach(function (requerimiento, requerimientoIndex){
                   if(requerimiento == item){
                       band = false;
                   }else{
                     $scope.inProcess.push(requerimiento);

                   }
               });
            });
            
       }
       
       return band;
    }
    
 
});
    