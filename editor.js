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
        var me = this,root = this.root;
        $(this.root).mousedown(function(e){
            var target = e.target;

            if(target === root){

                target = $('.para',root).last().children().last()[0];
                var width = $(target).allChildWidth();
                if($(target).offset().left + width < e.pageX){
                    target = $(target).children().last()[0]
                }
            }else{
                if($(target).hasClass('line')){
                    target = $(target).children().last()[0]
                }
            }
            me.receiver.clear();
            me.cursor.position(
                target,
                {
                    left: e.pageX,
                    top: e.pageY
                }
            ).show();

            //设置接收者
            var paraDiv = me.cursor.currentNode.parentNode.parentNode;


            me.receiver.nativeSel = $.getWindow(document).getSelection();

            me.receiver.currentPara = paraDiv;


            var node = me.receiver.setRootContent();
            me.receiver.setCursor(node.firstChild||node,me.cursor.currentIndex)

        });
    }
});