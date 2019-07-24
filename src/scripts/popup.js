var Popup = function(){
    var popup = {};
    var settings = {
        className: 'modal-defult',
    };

    function extend() {
        for (var i = 1; i < arguments.length; i++) {
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    arguments[0][key] = arguments[i][key]
                }
            }
        }
        return arguments[0]
    }

    function $(el) {
        return document.querySelectorAll(el);
    }



    popup.init = function(opt){

        var options = extend({}, settings, opt);
        console.log(options);

        var modals = $(options.className);
        console.log(modals);

        Array.prototype.forEach.call(modals, function(el) {
            el.style.display = 'none';
        })

    };
    return popup;
};