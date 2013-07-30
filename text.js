function Text($parent){
    var html = [];
    this.text = $parent.text();

    for(var i= 0,l=this.text.length;i<l;i++){
        html.push('<span>'+this.text.charAt(i)+'</span>')
    }

    var data = [];

    $parent.html(html.join('')).children().each(function(i,n){
        var offset = $(n).offset();
        data[i] = {
            'top':offset.top,
            'left':offset.left,
            'width':$(n).width(),
            'height':$(n).height()
        }
    })
    this.data = data;
    $parent.html(this.text)
}