module.exports = function () {

    function staticData ($http) {
        
        var factory = {};
    
       factory.getData = function (cb, error) {
            return $http.get('./app/data/data.json').then(cb, error);
        }
        return factory;
        
    }
    
    staticData.$inject = ['$http'];
    
    return staticData;
    
}