var _Popup = function() {
    var settings = {};
    function $(el) {
        return document.getElementsByClassName(el);
    }

    function show(el) {
        $(el).showModal();
    }

    function hide(el) {
        $(el).close();
    }

    function star(el) {
        $(el).addEventListener('click', )
    }
    return {
        init: function(opt){
            settings.buttonClass = (typeof opt.buttonClass === 'undefined') ? 'popup' : opt.buttonClass;
            start(settings.buttonClass);
        },
        show: function(){
            show(settings.buttonClass);
        },
        hide: function(){
            hide(settings.buttonClass);
        }
    };
};