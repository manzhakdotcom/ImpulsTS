var Select = function() {
    var select;

    function $(el) {
        return document.getElementById(el);
    }

    function test() {
        alert('hi');
    }

    function createSelect(data) {
        select = $('stations');
        select.className = 'stations';
        for(var i = 0, length = data.length; i < length; i++) {
            var opt = document.createElement('option');
            opt.id = data[i].id;
            opt.value = data[i].sign;
            opt.innerHTML = data[i].sign;

            select.appendChild(opt);
        }

    }

    return {
        create: function(data) {
            createSelect(data);
        }
    }
};