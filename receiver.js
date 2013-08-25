define('Receiver',{
    init : function(key,cursor){
        this.key = key;
        this.cursor = cursor;
        this.root = $('<div contenteditable="true" class="receiver"></div>')[0];
        this.tmppara = $('<div class="receiver"></div>')[0];
        this.initEvent();
        return this;
    },
    _updateCursor : function(){

        var count = 0,index = this.currentCountIndex,cursor = this.cursor;
        for(var i = 0,li;li=this.currentPara.children[i++];){
            for(var j= 0,sj;sj=li.children[j++];){
                count += sj.textContent.length;
                if(count >= index){
                    var offset = $(sj).offset();
                    if(count == index){

                        cursor.offset({
                            top : offset.top,
                            left : offset.left + $(sj).width()
                        })
                    }else{
                        count -= sj.textContent.length;
                        count = index - count;
                        var text = sj.textContent;
                        var textNode = sj.firstChild.splitText(count);
                        var left = $('<span></span>').insertBefore(textNode).offset().left;
                        cursor.offset({
                            top : offset.top,
                            left : left
                        })
                        sj.innerHTML = text;

                    }
                    return false;
                }

            }

        }


    },
    getCountIndexInPara : function(){

        var rng = this.nativeSel.getRangeAt(0);
        var count = rng.startOffset;
        var parent = rng.startContainer.parentNode;

        while(1){
            var pre = parent.previousElementSibling;
            if(pre){
                count += pre.textContent.length;
                parent = pre;
            }else{
                break;
            }
        }
        return count;
    },
    _updateLines : function(){



        this.tmppara.style.width = $(this.root).width() + 'px';
        this.currentCountIndex = this.getCountIndexInPara();
        this.tmppara.innerHTML = this.root.innerHTML;
        var line = $('<div></div>').css('display','inline')[0];
        var node = this.tmppara.firstChild;
        var width = this.width;

        var fraglines = document.createDocumentFragment();
        function checkEmptySpan(line){
            var node = line.lastChild;
            while(node){
                if(!node.lastChild){
                    var tmp = node.previousElementSibling;
                    $(node).remove();
                    node = tmp;

                }
                break;
            }
        }
        while(node){
            var span = $('<span ></span>')[0];
            var tmpNode = span.cloneNode(false);
            var nodetext = $(node).text();
            var fragSpans = document.createDocumentFragment();
            for(var i= 0,ci;ci=nodetext.charAt(i);i++){
                if(/[\u4e00-\u9fa5]|\s/.test(ci)){
                    if(tmpNode.firstChild){
                        fragSpans.appendChild(tmpNode);
                        tmpNode = span.cloneNode(false);
                    }
                    tmpNode.appendChild(document.createTextNode(ci));
                    fragSpans.appendChild(tmpNode);
                    tmpNode = span.cloneNode(false);
                }else{
                    tmpNode.innerHTML = tmpNode.innerHTML + ci;
                }
            }
            if(tmpNode.firstChild && (!tmpNode.parentNode || tmpNode.parentNode.nodeType == 11)){
                fragSpans.appendChild(tmpNode)
            }
            node.innerHTML = '';

            if(line.parentNode !== document.body){
                $(line).appendTo(document.body);
            }
            var tmpNode = node.cloneNode(false);
            $(line).append(tmpNode);
            while(fragSpans.firstChild){
                var first = fragSpans.firstChild;
                tmpNode.appendChild(first);
                if($(line).width() > width){
                    var last = tmpNode.lastChild;
                    fragSpans.insertBefore(last,fragSpans.firstChild);

                    if(!tmpNode.lastChild && line.firstChild === tmpNode){

                    }else{
                        tmpNode.innerHTML = tmpNode.textContent;
                        checkEmptySpan(line);
                        fraglines.appendChild(line);
                        line = line.cloneNode(false);
                        tmpNode = tmpNode.cloneNode(false);
                        $(line).appendTo(document.body).append(tmpNode);
                    }
                    if(last.textContent.length  != 1){
                        tmpNode.appendChild(last);

                        var text = last.textContent;
                        var i = text.length - 1;
                        if($(line).width() > width){
                            while($(line).width() > width){
                                last.textContent = text.slice(0,i--);
                            }
                            tmpNode.textContent = last.textContent;
                            line.appendChild(tmpNode);
                            checkEmptySpan(line);

                            fraglines.appendChild(line);
                            line = line.cloneNode(false);
                            tmpNode = tmpNode.cloneNode(false);
                            $(line).appendTo(document.body);
                            line.appendChild(tmpNode);
                            last.textContent = text.slice(i+1);

                            fragSpans.insertBefore(last,fragSpans.firstChild);
                        }else{
                            continue;
                        }

                    }


                }
            }
            tmpNode.innerHTML = tmpNode.textContent;
            if(tmpNode.firstChild && (!tmpNode.parentNode || tmpNode.parentNode.nodeType == 11)){
                line.appendChild(node.cloneNode(true));

            }
            node.textContent = nodetext;
            node = node.nextElementSibling;
        }
        if(line.parentNode === document.body){
            fraglines.appendChild(line);
        }
        for(var i= 0,ci;ci=fraglines.childNodes[i++];){
            $(ci).css('display','')
        }
        return fraglines;
    },
    _handleTxt:function(){
        var me = this;

        setTimeout(function(){
            var frag = me._updateLines();

            me.currentPara.innerHTML = '';
            me.currentPara.appendChild(frag);
            me._updateCursor();
        })

    },
    initEvent : function(){
        var me = this,timer,
            ime;
        var keyCode;
        me.lastlinewidth = 0;
        $(document).keypress(function(e){

            ime = false;
            if(!me.key.keyMap[keyCode]){
                clearTimeout(timer);
                me.cursor.stopblink();
                timer = setTimeout(function(){
                    me.cursor.startblink()
                },100);

                me._handleTxt()
            }
        }).keyup(function(e){
            if(e.target === me.root && ime !== false){
                    clearTimeout(timer);
                    me.cursor.stopblink();
                    timer = setTimeout(function(){
                        me.cursor.startblink()
                    },100);
                    me._handleTxt();
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
        $(node).append(this.root).append(this.tmppara);

        return this;
    },
    data:function(node){
        this.root.innerHTML = node.innerHTML;
        return this;
    },
    setCursor:function(node,offset){
        var me = this;
        me.range = Range(document);
        setTimeout(function(){
            me.range.setStart(node,offset).collapse(true).select();
        });
        return this;

    },
    clear:function(){
        this.root.innerHTML = '';
        return this;
    }
});