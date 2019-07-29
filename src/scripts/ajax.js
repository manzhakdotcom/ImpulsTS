'use strict';

var Ajax = function() {
    var settings = {
            url: 'php/getData.php',
            table: 'kp',
            param: '',
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

    function getData(opts, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', opts.url + '?table=' + opts.table + '&param=' + opts.param);
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback.apply(xhr);
            }
        };
         //null так как get запрос
    }




    return {
        init: function(opts) {
            settings = extend({}, settings, opts);
            getData(settings, function() {
                var data = JSON.parse(this.responseText);
                console.log(data);
                window.App.select.create(data);

            });
            var select = document.querySelectorAll('.stations')[0];
            select.addEventListener('change', function() {
                alert('hi');
            });
            console.log(select);
        },
    };

};





