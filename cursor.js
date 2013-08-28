define('Cursor',{
    init : function(){
        this.root = $('<span class="cursor">&zwj;</span>')[0];
    },
    _getData:function(node){

        this.data = $(node).getTxtData();
        return this;
    },
    _getCurrentIndex:function(mOffset){
        this.currentIndex = null;
        var x = mOffset.left;
        var me = this;
        $.each(this.data,function(i,d){
            if(x >= d.left && x <= d.left + d.width  ){
                if(x - d.left > d.width/2){
                    me.currentIndex = i + 1;
                }else{
                    me.currentIndex = i;
                }
                return false;
            }

        })

    },
    position:function(target,mOffset){
        var me = this;
        this.hide();
        if(target.tagName == 'SPAN'){
            me._getData(target)._getCurrentIndex(mOffset);
            me.currentNode = target;
        }else{
            $(target).children().each(function(i,n){
                if(n.tagName == 'SPAN'){
                    me._getData(n)._getCurrentIndex(mOffset);
                    if(me.currentIndex !== null){
                        me.currentNode = n;
                        return false;
                    }
                }else{
                    var offset = $(n).offset(),
                        width = $(n).width(),height = $(n).height();
                    if(mOffset.left >= offset.left && mOffset.left <= offset.left + width  ){
                        if(mOffset.left - offset.left > width/2){
                            me.currentIndex = i + 1;
                            me.offset({
                                top : offset.top + height - me.height(),
                                left : offset.left + width
                            })
                        }else{
                            me.currentIndex = i;
                            me.offset({
                                top : offset.top + height - me.height(),
                                left : offset.left
                            })
                        }
                        me.currentNode = n;
                        return false;
                    }
                }
            })
        }
        if(me.currentIndex !== null){
            var tmp = me.data[me.currentIndex];
            if(!tmp){
                tmp = me.data[me.data.length -1];
                tmp.left = tmp.left + tmp.width;
            }
            return me.offset({
                top : tmp.top,
                left : tmp.left
            });
        }else{
            if(target.tagName == 'SPAN'){
                me.currentNode = target;
            }else{
                me.currentNode = $('span',target).last()[0]
            }
            me.currentIndex = me.currentNode.textContent.length;
            var offset = $(me.currentNode).offset();
            me.offset( {
                top : offset.top,
                left : offset.left + $(me.currentNode).width()
            });
        }
        return this;

    },
    show:function(){
        var $root = $(this.root);
        this.timer = setInterval(function(){
            $root.toggleClass('blink')
        },350);
        return this;
    },
    stopblink:function(){
        clearInterval(this.timer);
        $(this.root).addClass('blink');
    },
    startblink:function(){
        this.show()
    },
    hide:function(){
        clearInterval(this.timer);
        $(this.root).removeClass('blink');
        return this;
    },
    height:function(){
        return $(this.root).height()
    },
    offset:function(obj){
        if(obj===undefined){
            return this._offset
        }else{
            this._offset = obj;
            $(this.root).css(obj);
        }

        return this;
    },
    updateX : function(offset){
        $(this.root).css('left',$(this.root).offset().left + offset)
    },
    appendTo:function(node){
        $(node).append(this.root);
        return this;
    },
    line : function(node,dir){
        var method =  dir == 'pre' ? 'previousSibling' : 'nextSibling';
        node = node[method];
        while(node && node.nodeType == 3){
            node = node[method]
        }
        return node;
    },
    towardsY:function(dir){

        var offset = this.offset();
        var currentNode = this.currentNode;
        var currentLine = currentNode.parentNode;
        var line = this.line(currentLine,dir);
        if(line){
           this.position(line,offset).show()
        }
        return this;
    },
    towardsX:function(dir){

    }


})
