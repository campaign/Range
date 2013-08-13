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
        var me = this,
            timer;
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
            me.receiver
                .offset({
                    top : me.cursor.offset().top,
                    left : $(me.cursor.currentNode).offset().left
                })
                .data(me.cursor.currentNode)
                .setCursor(me.cursor.currentIndex)

        });
    }
});