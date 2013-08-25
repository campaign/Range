define('Editor',{
    init : function(id){
        var me = this;
        me.root = $('#' + id)[0];
        me.cursor = Cursor().appendTo(me.root);
        me.key = Key();
        me.receiver = Receiver(me.key,me.cursor).appendTo(me.root);

        me.initEvent();
        return me;

    },
    initEvent : function(){
        var me = this;
        $(this.root).mousedown(function(e){
            me.receiver.clear();
            me.cursor.position(
                e.target,
                {
                    left: e.pageX,
                    top: e.pageY
                }
            ).show();
            //设置接收者
            var paraDiv = me.cursor.currentNode.parentNode.parentNode;


            me.receiver.nativeSel = $.getWindow(document).getSelection();
            $(me.receiver.root).width($(paraDiv).width());
            var frag = document.createDocumentFragment();
            var clonedCurrentNode;
            $(paraDiv).children().each(function(i,n){
                $(n).children().each(function(j,ni){
                    var node = ni.cloneNode(true);
                    if(ni === me.cursor.currentNode){
                        clonedCurrentNode = node;
                    }
                    frag.appendChild(node)
                })
            });
            me.receiver.currentPara = paraDiv;
            me.receiver.width = $(paraDiv).width();
            me.receiver.currentline = me.cursor.currentNode.parentNode;
            me.receiver.currentWidth = $(me.cursor.currentNode).width();
            $(me.receiver.root).html('').append(frag)
                .offset({
                    top :$(paraDiv).offset().top,
                    left : $(paraDiv).offset().left
                })

            me.receiver.setCursor(clonedCurrentNode.firstChild,me.cursor.currentIndex)

        });
    }
});