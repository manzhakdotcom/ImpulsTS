var Select = function() {

    function ajax(opts, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', opts.url + '?table=' + opts.table + '&param=' + opts.param);
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback.apply(xhr);
            }
        };
    }

    return {
        createElement: function() {
            ajax({
                url: 'php/getData.php',
                table: 'kp',
                param: '',
            }, function (xhr) {
                var select = document.querySelectorAll('select')[0];
                var option_default = document.createElement('option');
                option_default.value = '0';
                option_default.innerText = 'Выберите станцию';
                select.appendChild(option_default);
                var data = JSON.parse(this.responseText);
                if(data.hasOwnProperty('error')) {
                    alert(data.error);
                }
                data.forEach(function (item) {
                    var option = document.createElement('option');
                    option.value = item.id;
                    option.innerText = item.sign;
                    select.appendChild(option);
                });
                select.addEventListener('change', function(e) {
                    ajax({
                        url: 'php/getData.php',
                        table: 'ts',
                        param: e.target.value,
                    }, function(xhr) {
                        var data = JSON.parse(this.responseText);
                        if(data.hasOwnProperty('error')) {
                            alert(data.error);
                        }
                        var result = document.querySelectorAll('#result')[0];
                        result.innerHTML = '';
                        data.forEach(function (item) {
                            var div = document.createElement('div');
                            div.innerText = item.sign + ' - ' + item.dev_desc;
                            if(item.dev_desc == '0') {
                                div.className = 'alarm';
                            }
                            result.appendChild(div);
                        });
                    });
                });
            });
        }
    }
};