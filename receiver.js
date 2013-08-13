define('Receiver',{
    init : function(key,cursor){
        this.key = key;
        this.cursor = cursor;
        this.root = $('<div contenteditable="true" class="receiver"></div>')[0];
        this.initEvent();
        return this;
    },
    _handleTxt:function(lastWidth){
        var me = this;

        var $node = $(me.cursor.currentNode);
        if(!lastWidth){
            lastWidth = $node.width()
        }
        me.cursor.currentNode.innerHTML = me.root.innerHTML;
        var currentWidth = $node.width();
        me.cursor.updateX(currentWidth - lastWidth);
        lastWidth = currentWidth;
        me.cursor.currentIndex++;
    },
    initEvent : function(){
        var me = this,timer,lastWidth,
            ime;
        $(document).keypress(function(e){
            ime = false;
            if(e.target === me.root && !me.key.keyMap[e.keyCode]){
                clearTimeout(timer);
                me.cursor.stopblink();
                timer = setTimeout(function(){
                    me.cursor.startblink()
                },100);
                me._handleTxt(lastWidth)
            }
        }).keyup(function(e){
            if(e.target === me.root && ime !== false){
                clearTimeout(timer);
                me.cursor.stopblink();
                timer = setTimeout(function(){
                    me.cursor.startblink()
                },100);
                me._handleTxt(lastWidth);
            }
            ime = null;
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
        });
        return this;

    },
    clear:function(){
        this.root.innerHTML = '';
        return this;
    }
});