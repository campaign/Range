define('Receiver',{
    init : function(key,cursor){
        this.key = key;
        this.cursor = cursor;
        this.root = $('<div contenteditable="true" class="receiver"></div>')[0];
        this.initEvent();
        return this;
    },
    initEvent : function(){
        var me = this,timer;
        $(document).keypress(function(e){
            if(!me.key.keyMap[e.keyCode]){

                clearTimeout(timer);
                me.cursor.stopblink();
                timer = setTimeout(function(){
                    me.cursor.startblink()
                },100);
                var $node = $(me.cursor.currentNode);
                var lastWidth = $node.width();
                me.cursor.currentNode.innerHTML = me.root.innerHTML;
                me.cursor.updateX($node.width() - lastWidth);
                me.cursor.currentIndex++;
            }
        })
    },
    offset:function(of){
       $(this.root).css(of || {
           top:'',
           left:''
       });
       return this;
    },
    appendTo:function(node){
        $(node).append(this.root);
        return this;
    },
    data:function(node){
        this.root.innerHTML = node.innerHTML;
        return this;
    },
    setCursor:function(offset){
        var me = this;
        setTimeout(function(){
            Range(document).setStart(me.root.firstChild,offset).collapse(true).select();
        })
        return this;

    },
    clear:function(){
        this.root.innerHTML = '';
        return this;
    }
});