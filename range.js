define('Range',{
    init : function(doc){
        this.nativeRange = doc.createRange();
        this.nativeSel = $.getWindow(doc).getSelection();
    },
    select:function(){
        this.nativeSel.removeAllRanges();
        this.nativeSel.addRange(this.nativeRange);
        return this;
    },
    setStart:function(node,index){
        this.nativeRange.setStart(node,index);
        return this;
    },
    setEnd:function(node,index){
        this.nativeRange.setEnd(node,index);
        return this;
    },
    collapse:function(toStart){
        this.nativeRange.collapse(toStart === true);
        return this
    },
    insertNode:function(node){
        this.nativeRange.insertNode(node);
        return this;
    }
});