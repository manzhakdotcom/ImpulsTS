const Select = function() {
    const mnemo = [
        '20000',
        '10000',
        '10001',
        '40001',
        '40002',
        '90000',
        '90001',
    ];

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

    function setMnemoText(data){
        let new_data = JSON.parse(JSON.stringify(data));
        let length = new_data.length;
        console.log(length);
        
        for(let i=0;i<length; i++){
            if(mnemo.includes(new_data[i].mnemo_id)) {
                new_data[i].place = 'УЧ';
            } else {
                new_data[i].place = 'СТ';
            }
        }
        console.log(data);
        console.log(new_data);
        return new_data;
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
                        data = setMnemoText(data);
                        let result = document.querySelectorAll('#result')[0];
                        result.innerHTML = '';
                        data.forEach(function (item) {
                            let div = document.createElement('div');
                            div.innerHTML = item.sign + ' - ' + item.dev_desc + ' ' + item.place;
                            div.innerHTML += `<span class="info">&angrt; id: ${item.val_id}, ip: ${item.interface}, id_shem: ${item.id_shem}, id_mnemo: ${item.mnemo_id}</span>`;
                            if(item.dev_desc == '0') {
                                div.className ='alarm';
                            }
                            if(item.title !== null) {
                                div.setAttribute('title', item.title);
                            }
                            result.appendChild(div);
                        });
                    });
                });
            });
        }
    }
};