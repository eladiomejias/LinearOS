
    var app = angular.module("myApp");
    
    app.factory('staticData', function($http){
        
        var data;
        
        function getData(){
            return $http.get("./app/data/data.json");
        }
        
        return{
            getData: getData
        }
        
    });

    