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
$.fn.getTxtData = function(){
    var html = [],text = this.text();

    for(var i= 0,l = text.length;i<l;i++){
        html.push('<span >'+text.charAt(i)+'</span>')
    }

    var data = [];

    this[0].innerHTML = html.join('');

    this.children().each(function(i,n){
        var offset = $(n).offset();
        data[i] = {
            'top':offset.top,
            'left':offset.left,
            'width':$(n).width(),
            'height':$(n).height(),
            text:$(n).text()
        }
    });
    this[0].innerHTML = text;
    return data;
}