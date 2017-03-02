const cssClass = {
    HIDE : "hide--all",
    SHOW : "show--all"
}
module.exports.util = {

    hideComponent : function(component) {
        component.addClass(cssClass.HIDE);
    },
    showComponent : function(component){
        component.addClass(cssClass.SHOW);
    }

}