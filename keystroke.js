define('Key',{
    keyMap:{3: "Enter", 8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt",
        19: "Pause", 20: "CapsLock", 27: "Esc", 32: "Space", 33: "PageUp", 34: "PageDown", 35: "End",
        36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "PrintScrn", 45: "Insert",
        46: "Delete", 59: ";", 91: "Mod", 92: "Mod", 93: "Mod", 109: "-", 107: "=", 127: "Delete",
        186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\",
        221: "]", 222: "'", 63276: "PageUp", 63277: "PageDown", 63275: "End", 63273: "Home",
        63234: "Left", 63232: "Up", 63235: "Right", 63233: "Down", 63302: "Insert", 63272: "Delete"},
    handlerEvent : function(keyCode,receiver,e){
        this.recevier = receiver;
        switch (keyCode){
            //回车
            case 3:
            case 13:
                this._handlerEnter();
                e.preventDefault();
                break;
            case 8:
                this._handlerBackspace();
                e.preventDefault();
                break;
            case 38:
                var result = this._handlerUp();
                if(!result){
                    e.preventDefault();
                }
                break;
            case 40:
                var result = this._handlerDown();
                if(!result){
                    e.preventDefault();
                }
                break;
            case 37:
                var result = this._handlerLeft();
                if(!result){
                    e.preventDefault();
                }
                break;
            case 39:
                var result = this._handlerRight();
                if(!result){
                    e.preventDefault();
                }
                break;

        }
    },
    _handlerEnter:function(){
        var re = this.recevier;
        re.currentCountIndex = re.getCountIndexInPara();
        var obj = re._getNodeAndOffsetByCountIndex();
        $(obj.node).breakParent(re.currentPara,obj.offset);
        re.currentCountIndex = 0;
        re.currentPara = re.currentPara.nextElementSibling;
        re.setRootContent();
        re._updateCursor();
        var node = re.root.firstChild.firstChild;
        re.setCursor(node.firstChild||node,0);
    },
    _handlerBackspace:function(){

    },
    _getPreLine:function(line){
        var pre = line.previousElementSibling;
        if(pre){
            return pre;
        }
        var para = line.parentNode;
        pre = para.previousElementSibling;
        if(pre){
            return $(pre).children().last()[0]
        }
        return null;
    },
    _getNextLine:function(line){
        var pre = line.nextElementSibling;
        if(pre){
            return pre;
        }
        var para = line.parentNode;
        pre = para.nextElementSibling;
        if(pre){
            return $(pre).children().first()[0]
        }
        return null;
    },
    _handlerDown:function(){
        var me = this;
        var re = this.recevier;
        re.currentCountIndex = re.getCountIndexInPara();
        var obj = re._getNodeAndOffsetByCountIndex();
        var line = obj.node.parentNode;
        var preline = this._getNextLine(line);
        if(preline && preline.parentNode === line.parentNode){
            re.currentCountIndex = re.getCountIndexInPara();
            re._updateCursor();
            return true;
        }
        if(preline){
            var left = re.cursor.offset().left;
            var index = null;
            $(preline).children().each(function(i,s){
                var offset = $(s).offset();
                if(offset.left <= left && offset.left + $(s).width() >= left){
                    var data = $(s).getTxtData();

                    $.each(data,function(i,d){
                        if(left >= d.left && left <= d.left + d.width  ){
                            if(left - d.left > d.width/2){
                                index = i + 1;
                            }else{
                                index = i;
                            }
                            return false;
                        }

                    })




                    re.currentPara = preline.parentNode;
                    re.cursor.currentNode = s;
                    var node = re.setRootContent();
                    re.setCursor(node.firstChild||node,index);
                    return false;
                }
            });
            if(index == null){
                re.currentPara = preline.parentNode;
                re.cursor.currentNode = $(preline).children().last()[0];
                var node = re.setRootContent();
                re.setCursor(node.firstChild||node,re.cursor.currentNode.textContent.length);
            }

        }
    },
    _handlerUp:function(){

        var me = this;
        var re = this.recevier;
        re.currentCountIndex = re.getCountIndexInPara();
        var obj = re._getNodeAndOffsetByCountIndex();
        var line = obj.node.parentNode;
        var preline = this._getPreLine(line);
        if(preline && preline.parentNode === line.parentNode){
            re.currentCountIndex = re.getCountIndexInPara();
            re._updateCursor();
            return true;
        }
        if(preline){
            var left = re.cursor.offset().left;
            var index = null;
            $(preline).children().each(function(i,s){
                var offset = $(s).offset();
                if(offset.left <= left && offset.left + $(s).width() >= left){
                    var data = $(s).getTxtData();

                    $.each(data,function(i,d){
                        if(left >= d.left && left <= d.left + d.width  ){
                            if(left - d.left > d.width/2){
                                index = i + 1;
                            }else{
                                index = i;
                            }
                            return false;
                        }

                    })




                    re.currentPara = preline.parentNode;
                    re.cursor.currentNode = s;
                    var node = re.setRootContent();
                    re.setCursor(node.firstChild||node,index);
                    return false;
                }
            });
            if(index == null){
                re.currentPara = preline.parentNode;
                re.cursor.currentNode = $(preline).children().last()[0];
                var node = re.setRootContent();
                re.setCursor(node.firstChild||node,re.cursor.currentNode.textContent.length);
            }

        }
    },
    _handlerLeft:function(){
        var re = this.recevier;
        re.currentCountIndex = re.getCountIndexInPara();
        if(re.currentCountIndex == 0 ){
           var para = re.currentPara.previousElementSibling;
            if(para){
                var node  = $(para).lastChild().lastChild();
                re.currentPara = para;
                re.cursor.currentNode = node[0];
                var node = re.setRootContent();
                re.setCursor(node.firstChild||node,node.textContent.length);
            }
        }else{
            return true;
        }
    },
    _handlerRight:function(){
        var re = this.recevier;
        re.currentCountIndex = re.getCountIndexInPara();
        if(re.currentCountIndex == re.root.textContent.length ){
            var para = re.currentPara.nextElementSibling;
            if(para){
                var node  = $(para).firstChild().firstChild();
                re.currentPara = para;
                re.cursor.currentNode = node[0];
                var node = re.setRootContent();
                re.setCursor(node.firstChild||node,0);
            }
        }else{
            return true;
        }
    }
})