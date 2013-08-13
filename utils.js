$.getWindow = function(doc){
    return doc.defaultView || doc.parentWindow;
};
$.extend2 = function (t, s) {
    var a = arguments,
        notCover = $.type(a[a.length - 1]) == 'boolean' ? a[a.length - 1] : false,
        len = $.type(a[a.length - 1]) == 'boolean' ? a.length - 1 : a.length;
    for (var i = 1; i < len; i++) {
        var x = a[i];
        for (var k in x) {
            if (!notCover || !t.hasOwnProperty(k)) {
                t[k] = x[k];
            }
        }
    }
    return t;
};