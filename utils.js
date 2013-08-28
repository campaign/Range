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

$.fn.breakParent = function(parent,offset){
    var node = this[0],
        frag = document.createDocumentFragment();

    var nodeClone = node.cloneNode(false);
    var text = node.textContent;
    node.textContent = text.slice(0,offset);
    nodeClone.textContent = text.slice(offset);
    frag.appendChild(nodeClone);

    while(node !== parent){
        while(node.nextElementSibling){
            frag.appendChild(node.nextElementSibling)
        }

        var parentClone = node.parentNode.cloneNode(false);
        parentClone.appendChild(frag)
        frag.appendChild(parentClone);
        node = node.parentNode;
    }
    parent.parentNode.insertBefore(frag,parent.nextSibling)
}
$.fn.allChildWidth = function(){
    var width = 0;
    $(this[0]).children().each(function(i,c){
        width += $(c).width()
    });
    return width;
}

$.fn.lastChild = function(){
    return this.children().last()
}
$.fn.firstChild = function(){
    return this.children().first()
}