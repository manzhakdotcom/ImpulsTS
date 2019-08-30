const Popup = function(){
    let settings = {
            button: '#modal',
            maxWidth: 850,
            minWidth: 280,
            className: 'fade-and-drop',
        },
        modal,
        closeButton,
        overlay,
        transitionEnd = transitionSelect();

    function transitionSelect() {
        let el = document.createElement("div");
        if (el.style.WebkitTransition) return "webkitTransitionEnd";
        if (el.style.OTransition) return "oTransitionEnd";
        return 'transitionend';
    }

    function extend() {
        for (let i = 1; i < arguments.length; i++) {
            for (let key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    arguments[0][key] = arguments[i][key]
                }
            }
        }
        return arguments[0]
    }

    function $(el) {
        return document.querySelectorAll(el)[0];
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
        let button = $(settings.button);
        button.addEventListener('click', open);

    }

    function buildModel() {
        let contentHolder,
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
        window.App.search.init();
        handlerModel();

        window.getComputedStyle(modal).height;
        modal.className = modal.className + (modal.offsetHeight > window.innerHeight ? ' scotch-open scotch-anchored' : ' scotch-open');
        overlay.className = overlay.className + ' scotch-open';
        window.App.select.createElement();
    }

    function createModal() {
        let frag = document.createDocumentFragment();
        let div = document.createElement('div');
        div.className = 'modal-wrapper';
        let h4 = document.createElement('h4');
        h4.innerText = settings.title;
        div.appendChild(h4);
        let p = document.createElement('p');
        p.innerHTML = settings.content;
        div.appendChild(p);
        let select = document.createElement('select');
        select.disabled = true;
        let option_default = document.createElement('option');
        option_default.innerText = 'Загрузка станций...';
        option_default.value = '0';
        select.appendChild(option_default);
        div.appendChild(select);
        let div_result = document.createElement('div');
        div_result.id = 'result';
        div.appendChild(div_result);
        let checkbox = document.createRange().createContextualFragment('<div class="check"><label class="container">Расширенный вид<input type="checkbox" name="extend" id="extend"><span class="checkmark"></span></label></div>');
        div.appendChild(checkbox);
        frag.appendChild(div);
        return frag;

    }

    return {
        init: function(opt){
            settings = extend({}, settings, opt);
            handlerButton();

        }
    };

};