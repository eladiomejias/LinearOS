var app = angular.module("myApp");

// Basic controller for the aplication
app.controller('desktopController', function ($scope, $compile, $mdToast, staticData){
    // Variables from System Information
      //demo scopes
      $scope.hello = "Linear OS";
      // fecha del programa
      $scope.date = new Date();
      //animation scope
      $scope.animation = false;
      $scope.menuAnimation = false;
      // sized window
      $scope.classNamed = false;

    // Variables from system data
      // init the data json $scope
      $scope.myData;
      //Code for program open
      var add = "-program";
      //var for deadlock
      $scope.inProcess = [];
      //scope for ram
      //$scope.ramUse = [];


    // Getting data to $scope
    // Async func, this execute after reading all the js
    staticData.getData().success(function(theData){

        $scope.myData = theData;
        console.log($scope.myData);
        // Init RAM values
        $scope.ramValue = $scope.myData.maquina.RAM.MB;
        $scope.ramUse = new Array ($scope.ramValue);
        initRAM($scope.ramUse);




    }).error(function(error){

        console.log(error);

    });


    // Init the RAM with 0
    function initRAM(ram){
      for (var i = 0; i < ram.length; i++) {
        ram[i] = 0;
      }
    }


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
        // function to search the index
        var index = searchId(nombreId);
        var valor = verificar(index);
        var nombre = $scope.myData.programas[index].nombre;
        var myToast, estado;

        if(activeValue == false){
                //console.log(nombreId);

                if(valor && $scope.myData.programas[index].stats != "bloqueado"){

                    // my created id
                    var createdId = nombreId;
                    createdId += add;

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

                    addToRam(index);

                    // Inicializar si todo corrio perfecto
                    $scope.myData.programas[index].stats = "activo";
                    
                    // Toast Message
                    myToast = $mdToast.simple().action('OK').position('top right');
                    estado = $scope.myData.programas[index].stats;
                    creatingToast(myToast, nombre, estado);

                }else{
                  console.log("Interbloqueo");
                  $scope.myData.programas[index].stats = "espera";
                  var time = $scope.myData.programas[index].quantum * 1000;
                  addToRam(index);
                  // Toast Message
                  myToast = $mdToast.simple().action('OK').position('top right');
                  estado = $scope.myData.programas[index].stats;
                  creatingToast(myToast, nombre, estado);
                  
                  setTimeout(function(){
                    $scope.$apply(function (){
                      // Aplicando
                      $scope.myData.programas[index].stats = "bloqueado";
                      myToast = $mdToast.simple().action('OK').position('top right');
                      estado = $scope.myData.programas[index].stats;
                      creatingToast(myToast, nombre, estado);
                      setTimeout(function(){
                        $scope.$apply(function (){
                          // Aplicandondo el apagado en 2 segundos despues del block
                          deletefromRam(index);
                          $scope.myData.programas[index].stats = "apg";
                        });
                      }, 2000);
                    });
                  }, time);
                }

        }else{
            console.log("Error this program is open. Please choose another program.");
        }
    }

    // Verifica si el programa no produce un interbloqueo
    function verificar(index){
    var programa =   $scope.myData.programas[index].req;
    var band = true;
    if($scope.inProcess.length == 0){
      programa.forEach(function (item, index){

      });
    }else{
      $scope.inProcess.forEach( function(reqItem, reqIndex ){
      //  console.log("Ocurre ", reqItem );
        programa.forEach(function (item, index){
          if(reqItem == item){
            band = false;
        }
        });
      });
    }

    if(band){
      programa.forEach(function (item, index){
        $scope.inProcess.push(item);
      });
    }

    return band;

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
       deletefromRam(index);
       removing(index);
    }

    function removing(index){
      var valoresEliminar = $scope.myData.programas[index].req;
      var valoresTotales = $scope.inProcess;
      valoresTotales = valoresTotales.filter(item => valoresEliminar.indexOf(item) == -1);
      $scope.inProcess = valoresTotales;
    }

    // When program is added, now is added to RAM
    function addToRam(index){
      console.log("Entro");
      var ramProgram = $scope.myData.programas[index].mb;
      var aux = ramProgram;
      for (var i = 0; i < $scope.ramUse.length; i++) {
        if(aux != 0 && $scope.ramUse[i] == 0){
          $scope.ramUse[i] = index + 1;
          aux--;
        }else if(aux == 0){
          break;
        }
      }

    }

    // When program is deleted, now is deleted from RAM
    function deletefromRam(index){
      var ramProgram = $scope.myData.programas[index].mb;
      var aux = ramProgram;
      for (var i = 0; i < $scope.ramUse.length; i++) {
        if(aux != 0 && $scope.ramUse[i] == index+1){
          $scope.ramUse[i] = 0;
          aux--;
        }else if(aux == 0){
          break;
        }
      }
    }

    // Compactacion
    $scope.compactar = function(){
      var compactado = [];

      for (var i = 0; i < $scope.myData.programas.length; i++) {
        if($scope.myData.programas[i].stats == "activo"){
          for (var e = 0; e < $scope.myData.programas[i].mb; e++) {
            compactado.push(i+1);
          }
        }
      }

      // Init ram properties
      initRAM($scope.ramUse);
      for (var i = 0; i < compactado.length; i++) {
        $scope.ramUse[i] = compactado[i];
      }
    }
    
    // when Toast is created
    creatingToast = function(myToast, nombre, estado){
      var message;
      switch (estado) {
        case 'espera':
          message = nombre +" esta en "+estado;
          break;
        
        default:
          message = nombre+" está "+estado;
      }
      
      myToast.textContent(message);
      $mdToast.show(myToast);
      

    }
    

    
    
});
