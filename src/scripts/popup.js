var Popup = function(){
    var popup = {},
        settings = {
            button: '#modal-trigger-default',
            content: '#modal-content-default',
            maxWidth: 600,
            minWidth: 280,
            className: 'fade-and-drop',
        },
        modal,
        closeButton,
        overlay,
        transitionEnd = transitionSelect();

    function transitionSelect() {
        var el = document.createElement("div");
        if (el.style.WebkitTransition) return "webkitTransitionEnd";
        if (el.style.OTransition) return "oTransitionEnd";
        return 'transitionend';
    }

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
        return document.getElementById(el);
    }

    function close() {
        modal.className = modal.className.replace(" scotch-open", "");
        overlay.className = overlay.className.replace(" scotch-open", "");
        modal.addEventListener(transitionEnd, function() {
            modal.parentNode.removeChild(modal);
        });
        overlay.addEventListener(transitionEnd, function() {
            if(overlay.parentNode) overlay.parentNode.removeChild(overlay);
        });
    }

    function handlerModel(){
        closeButton.addEventListener('click', close);
        overlay.addEventListener('click', close);
    }

    function handlerButton(){
        var button = $(settings.button);
        button.addEventListener('click', open);

    }

    function buildModel() {
        var contentHolder,
            docFrag;
        
        docFrag = document.createDocumentFragment();
        
        modal = document.createElement('div');
        modal.className = 'scotch-modal ' + settings.className;
        modal.style.minWidth = settings.minWidth + 'px';
        modal.style.maxWidth = settings.maxWidth + 'px';

        closeButton = document.createElement('button');
        closeButton.className = 'scotch-close close-button';
        closeButton.innerHTML = '&times;';
        modal.appendChild(closeButton);

        overlay = document.createElement("div");
        overlay.className = "scotch-overlay " + settings.className;
        docFrag.appendChild(overlay);

        contentHolder = document.createElement("div");
        contentHolder.className = "scotch-content";
        contentHolder.appendChild(createModal());
        modal.appendChild(contentHolder);

        docFrag.appendChild(modal);

        document.body.appendChild(docFrag);
    }

    function open() {
        buildModel();
        handlerModel();
        window.getComputedStyle(modal).height;
        modal.className = modal.className + (modal.offsetHeight > window.innerHeight ? ' scotch-open scotch-anchored' : ' scotch-open');
        overlay.className = overlay.className + ' scotch-open';
        window.App.select.createElement();
    }

    function createModal() {
        var frag = document.createDocumentFragment();
        var div = document.createElement('div');
        div.className = 'modal-wrapper';
        var h4 = document.createElement('h4');
        h4.innerText = 'Title';
        div.appendChild(h4);
        var p = document.createElement('p');
        p.innerText = 'Content';
        div.appendChild(p);
        var select = document.createElement('select');
        div.appendChild(select);
        var div_result = document.createElement('div');
        div_result.className = 'result';
        div.appendChild(div_result);
        frag.appendChild(div);
        return frag;

    }

    return {
        init: function(opt){
            settings = extend({}, settings, opt);
            handlerButton();

            /*
            var modals = $(options.className);
            console.log(modals);

            Array.prototype.forEach.call(modals, function(el) {
                el.style.display = 'none';
            })
            */

        }
    };

};