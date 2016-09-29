module.exports = function() {
    
    var PanelDirective = function() {
        
        return {
            restrict: 'E',
            templateUrl: 'app/directives/panel-control/panel.html',
            replace: true
        };
        
    };
    
    return PanelDirective;
    
}
