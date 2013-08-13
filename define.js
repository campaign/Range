var _Object = function(){};
_Object.prototype = {
    on : function(){
    }
};
function _createObj(ClassObj,pro){
    var obj;
    if(Object.create){
        obj =  Object.create(ClassObj.prototype)
    }else {
        var _fn = function(){};
        $.extend(_fn.prototype,ClassObj.prototype);
        obj = new _fn;
    }
    return $.extend(obj,pro)
}
function _createClass(ClassObj,properties,superClass){
    $.extend2(ClassObj.prototype,
        properties,
        (window[superClass]||_Object).prototype,
        true
    );
    ClassObj.prototype.super =  ( window[superClass] || _Object ).prototype;
    ClassObj.guid = 0;
    return ClassObj;
}
function define(className,properties,superClass){
    var ClassObj = window[className] = _createClass(function(){

        var _obj = _createObj(ClassObj,{
            _objname : className,
            _guid :  ClassObj.guid++,
            options: $.extend({},ClassObj.prototype.options||{})
        });
        _obj.init && _obj.init.apply(_obj,arguments);
        return _obj;
    },properties,superClass)
}