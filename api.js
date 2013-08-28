(function (){
    var paths  = [
            'utils.js',
            'define.js',
            'cursor.js',
            'receiver.js',
            'editor.js',
            'keystroke.js',
            'range.js'
        ],
        baseURL = '';
    for (var i=0,pi;pi = paths[i++];) {
        document.write('<script type="text/javascript" src="'+ baseURL + pi +'"></script>');
    }
})();