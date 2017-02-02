var app = angular.module("myApp");

// Basic controller for the aplication
app.controller('desktopController', function ($scope, $compile, $mdToast, staticData){
  
      // Variables de informacion del sistema
      // Fecha del programa
      $scope.date = new Date();
      // Animation scope
      $scope.animation = false;
      $scope.menuAnimation = false;
      // Sized window
      $scope.classNamed = false;

      // Variables del Sistema
      // Init the Data json $scope
      $scope.myData;
      // Code for program open
      var add = "-program";
      // Variable for deadlock
      $scope.inProcess = [];
      // Variable de posicionamiento random
      $scope.randomProcess = [];
      // Planificacion FCFS
      $scope.FCFS = [];
      // Planificacion SCAN
      $scope.planSCAN = [];
      
      $scope.spaceUsed;
      $scope.cantMB = 0;
      
      $scope.fcfsHide = false;
      $scope.scanHide = false;


    // Getting data to $scope
    // Async func, this execute after reading all the js
    staticData.getData().success(function(theData){

        $scope.myData = theData;
        console.log($scope.myData);
        // Init RAM values - Primary and Secondary
        $scope.ramValue = $scope.myData.maquina.RAM.MB;
        $scope.ramUse = new Array ($scope.ramValue);
        $scope.secMemory = $scope.myData.maquina.RAM.secMemory;
        $scope.secMem = new Array ($scope.secMemory);
        initRAM($scope.ramUse);
        initRAM($scope.secMem);
        planificacionDisco();
        calcEspacio();

    }).error(function(error){

        console.log(error);

    });


    // Init the memory with 0
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
        var nombre = $scope.myData.programas[index].nombre;
        var myToast, estado;
        if(activeValue == false){
              //console.log(nombreId);
              if(ramSpace(index)){
                console.log(ramSpace(index))
                var valor = verificar(index);
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
                    
                    // Se agrega a la ram el elemento
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
                  // Toast Message - when open program
                  myToast = $mdToast.simple().action('OK').position('top right');
                  estado = $scope.myData.programas[index].stats;
                  creatingToast(myToast, nombre, estado);
                  
                  setTimeout(function(){
                    $scope.$apply(function (){
                      // Block state apply
                      $scope.myData.programas[index].stats = "bloqueado";
                      myToast = $mdToast.simple().action('OK').position('top right');
                      estado = $scope.myData.programas[index].stats;
                      creatingToast(myToast, nombre, estado);
                      setTimeout(function(){
                        $scope.$apply(function (){
                          // Aplicandondo el off state en 2 segundos despues del block state
                          deletefromRam(index);
                          $scope.myData.programas[index].stats = "apg";
                        });
                      }, 2000);
                    });
                  }, time);
                }

              }else{
                console.log("Programa en cola secundaria");
                swapIn(index); 
                myToast = $mdToast.simple().action('OK').position('top right');
                creatingToast(myToast, nombre, "swapIn");
              } 
              
        }else{
            console.log("Error this program is open. Please choose another program.");
        }
    }

    // Verificar el interbloqueo / inanicion de un programa abierto.
    function verificar(index){
    var programa = $scope.myData.programas[index].req;
    var band = true;
    if($scope.inProcess.length != 0){
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
  
  function random(){
    var max = 1000, 
    min = 1,
    number = 0, temp = $scope.randomProcess;
    number = (Math.random() * (max - min)) + min;
    number = Math.floor(number);
    temp.push(number);
    return temp;
  }
  
   // Verify the ram space avalaible
    function ramSpace(index){
      var programa_mb = $scope.myData.programas[index].mb;
      conta = 0;
      $scope.ramUse.forEach( function(item, index ){
        if(item == 0){
          conta++;
        }
      });
      if(programa_mb <= conta){ return true; }else{ return false; }
    }

    // Function to look who is the index of the program that will be open
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

   // Function for the close event of program
   $scope.closeProgram = function(index){
        // Enter in the close programs
       console.log("Borrar programa");
       var search = $scope.myData.programas[index].id;
       var searchIndexProgram = search;
       searchIndexProgram += add;
       // Calls this
       $("#"+searchIndexProgram).remove();
       // Remove class
       $("#"+search).removeClass("active-icon");
       // It's no longer act
       // So we change the scope value
       $scope.myData.programas[index].active = false;
       $scope.myData.programas[index].stats = "apg";
       // Elimina de la memoria principal el programa
       deletefromRam(index);
       // Remueve el programa de la UI
       removing(index);
        // Intenta un Swap Out del primer elemento
        swapOut(index);
    }
    
      // When program is deleted, after this will be swaput programs
    function swapOut(index){
      var cont = 0, conta2 = 0;
      var second = $scope.secMem[0];

      if(second == 0){
        
        return;
        
      }else{
        var second_id = second - 1;
        var programName = $scope.myData.programas[second_id].id;
        var cont = 0;
        $scope.secMem.forEach( function(item, index ){
          if(item == second_id + 1){
            cont++;
            console.log(item);
         }
         });
        
         $scope.ramUse.forEach( function(item, index ){
           if(item == 0){
            conta2++;
           }
          });
        
        console.log(cont+" "+conta2);
        if(cont <= conta2){ 
          // Pushing to the RAM
          $scope.openProgram(programName, false);
          cleaning(second);
          compact_second();
        }
        
      }
    }
    
    // Limpia los elementos que salen del Swap.
    function cleaning(num){
      for (var i = 0; i < $scope.secMem.length; i++) {
        if($scope.secMem[i] == num){
          $scope.secMem[i] = 0;
        }
      }
    }
    
    // Function to compact the second memory without problems.
    function compact_second(){
      // Cortar array con jquery
      let removeItem = 0;
      var y = $scope.secMem;
      y = jQuery.grep(y, function(value) {
       return value != removeItem;
      });
      // Calc of length
      var rest = $scope.secMemory - y.length;
      console.log(y);
      // Aux array
      var aux = new Array (rest);
      initRAM(aux);
      // Concat array of 0 with array with nums
      $scope.secMem = y.concat(aux);
      
    }
    

    function removing(index){
      var valoresEliminar = $scope.myData.programas[index].req;
      var valoresTotales = $scope.inProcess;
      valoresTotales = valoresTotales.filter(item => valoresEliminar.indexOf(item) == -1);
      $scope.inProcess = valoresTotales;
    }
    
    function removingTwo(toRemove, baseArray){
      var valoresEliminar = toRemove;
      var valoresTotales = baseArray;
      valoresTotales = valoresTotales.filter(item => valoresEliminar.indexOf(item) == -1);
      return valoresTotales;
    }

    // When program is added, now is added to RAM
    function addToRam(index){
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
  
    // When program cannot be added, is added to secondary memory
    function swapIn(index){
      var ramProgram = $scope.myData.programas[index].mb;
      var aux = ramProgram;
      for (var i = 0; i < $scope.secMem.length; i++) {
        if(aux != 0 && $scope.secMem[i] == 0){
          $scope.secMem[i] = index + 1;
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
    

    // Compactacion de memoria RAM.
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
        
        case 'swapIn':
           message = "Swap In de "+nombre;
          break;
          
        default:
          message = nombre+" está "+estado;
      }
      
      myToast.textContent(message);
      $mdToast.show(myToast);
      
    }
    
    function planificacionDisco(){
      //Crea su posicion en memoria
      for(var i = 0; i<$scope.myData.programas.length; i++){
        $scope.randomProcess = random();
      }
    }
    
    // Calcular espacio restante del disco
    function calcEspacio(){
      var array = $scope.myData.programas;

      for (var i = 0; i < $scope.myData.programas.length; i++) {
          $scope.cantMB = $scope.myData.programas[i].mb + $scope.cantMB;
      }
      
      $scope.spaceUsed = Math.floor(($scope.cantMB/$scope.myData.maquina.disco.MB) * 100);
      
    }
    
    
    $scope.planFCFS = function (){
      $scope.fcfsHide = !$scope.fcfsHide;
      $scope.FCFS == $scope.randomProcess;
    }

    $scope.planSCAN = function(){
      var dir = Math.round(Math.random()), min = 0, max = 0, random = 0;
      
      if($scope.randomProcess.length > 4){ 
        max = Math.max.apply(null, $scope.randomProcess);
        posRan = Math.floor((Math.random() * $scope.randomProcess.length) + 0);
        random = Math.floor((Math.random() * max) + min);
      }
      var aux = $scope.randomProcess;
      var pivote = aux[posRan];
      var pivoteIndex = aux.indexOf(pivote)
      var bottomArray = aux.splice(0, pivoteIndex);
      var topArray = removingTwo(bottomArray, aux);
      
      // Concat for posible bug
      $scope.randomProcess = bottomArray.concat(topArray);
      
      
      // ECMA 6 Script
      topArray = topArray.filter(item => item !== pivote);
      
     /* console.log(pivote);
      console.log(bottomArray);
      console.log(topArray); */
      
      // Llamada a funcion de reocrrido
      recorrido(topArray, bottomArray, dir);
      
    }
    
    function recorrido(top, bottom, direccion, pivote){
      if(direccion == 1){
        recorridoPositivo(top, bottom, pivote, direccion);
      }else{
        recorridoNegativo(top, bottom, pivote, direccion);
      }
    }
    
    // Ejecuta cuando el recorrido es positivo (+)
    function recorridoPositivo(top, bottom, pivote, path){
      
    }
    
    
    
    
    
});
