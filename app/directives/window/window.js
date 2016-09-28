module.exports = function() {
    
    var WindowDirective = function() {
        
        return {
            restrict: 'E',
            templateUrl: 'app/directives/window/window.html',
            replace: true
        };
        
    };
    
    return WindowDirective;
    
}
