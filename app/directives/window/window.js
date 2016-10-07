module.exports = function() {
    
    var WindowDirective = function() {
        
        return {
            restrict: 'E',
            scope: {
                nombre: '='
            },
            templateUrl: 'app/directives/window/window.html',
            link:function(scope,elem,attrs){
                console.log('test', scope.nombre);
             },
            replace: true
        };
        
    };
    
    return WindowDirective;
    
}
