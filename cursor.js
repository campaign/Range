function Cursor(doc){
    this.$root = $('<span class="cursor">&zwj;</span>',doc);
    this.timer = null;

}
Cursor.prototype ={
    height:function(num){
        this.$root.height(num);
        return this;
    },
    show:function(){
        var $root = this.$root;
        this.timer = setInterval(function(){
            $root.toggleClass('blink')
        },350);
        return this;
    },
    hide:function(){
        clearInterval(this.timer);
        this.$root.removeClass('blink');
        return this;
    },
    offset:function(obj){
        this.$root.css(obj || {
            top:'',
            left:''
        });
        return this;
    },
    remove:function(){
        this.$root.remove();
        return this;
    },
    insertAfter:function(node){
        this.$root.insertAfter(node);
        return this;
    },
    insertBefore:function(node){
        this.$root.insertBefore(node)
        return this;
    },
    appendTo:function(node){
        this.$root.appendTo($(node));
        return this;
    },
    top:function(){
        return this.$root.offset().top
    },
    height:function(){
        return this.$root.height()
    },
    prev:function(){
        return this.$root[0].previousSibling;
    }

}