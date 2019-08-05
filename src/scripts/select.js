const Select = function() {

    function ajax(opts, callback) {
        let xhr = new XMLHttpRequest();
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
                let data = JSON.parse(this.responseText);
                if(data.hasOwnProperty('error')) {
                    alert(data.error);
                }
                let select = document.querySelectorAll('select')[0];
                select.disabled = false;
                select.options[0].text = 'Выберите станцию';
                data.forEach(function (item) {
                    let option = document.createElement('option');
                    option.value = item.id;
                    option.innerText = item.sign;
                    select.appendChild(option);
                });
                select.addEventListener('change', function(e) {
                    let result = document.querySelectorAll('#result')[0];
                    result.innerHTML = 'Загрузка импульсов...';
                    document.getElementById('search').value = '';
                    ajax({
                        url: 'php/getData.php',
                        table: 'ts',
                        param: e.target.value,
                    }, function(xhr) {
                        let data = JSON.parse(this.responseText);
                        if(data.hasOwnProperty('error')) {
                            alert(data.error);
                        }
                        let result = document.querySelectorAll('#result')[0];
                        result.innerHTML = '';
                        data.forEach(function (item) {
                            let div = document.createElement('div');
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