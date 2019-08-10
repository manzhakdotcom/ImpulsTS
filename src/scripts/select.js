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
        for(let i=0;i<length; i++){
            if(mnemo.includes(new_data[i].mnemo_id)) {
                new_data[i].place = 'Участок';
            } else {
                new_data[i].place = 'Станция';
            }
        }
        console.log(new_data);
        return new_data;
    }

    function handlerCheck(){
        let check = document.querySelectorAll('input[name=extend]')[0];
        let info = document.getElementsByClassName('info');
        check.addEventListener('change', function() {
            if(this.checked) {
                for (let item of info) {
                    item.style.display = 'block';
                }
            } else {
                for (let item of info) {
                    item.style.display = 'none';
                }
            }
        });
    }

    function checked() {
        let el = document.querySelector('input[name=extend]');
        if (el.checked) {
            return 'block';
        } else {
            return 'none';
        }
    }

    function showData(xhr) {
        let data = JSON.parse(this.responseText);
        if(data.hasOwnProperty('error')) {
            alert(data.error);
        }
        data = setMnemoText(data);
        let result = document.querySelectorAll('#result')[0];
        result.innerHTML = '';
        data.forEach(function (item) {
            let div = document.createElement('div');
            let sign = item.dev_desc == '1'?'Нет':'Есть';
            div.innerHTML = item.sign + ' - ' + sign;
            div.innerHTML += `<span class="info" style="display: ${checked()};">&angrt; id: ${item.val_id}, ip: ${item.interface}, id_shem: ${item.id_shem}, id_mnemo: ${item.mnemo_id}, signal: ${item.dev_desc}, ${item.place}</span>`;
            if(item.dev_desc == '0') {
                div.className ='alarm';
            }
            if(item.title !== null) {
                div.setAttribute('title', item.title);
            }
            result.appendChild(div);
        });
        handlerCheck();
    }

    function getData(e) {
        let result = document.querySelectorAll('#result')[0];
        result.innerHTML = 'Загрузка импульсов...';
        document.getElementById('search').value = '';
        ajax({
            url: 'php/getData.php',
            table: 'ts',
            param: e.target.value,
        }, showData);
    }

    function getStation (xhr) {
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
        select.addEventListener('change', getData);
    }

    return {
        createElement: function() {
            ajax({
                url: 'php/getData.php',
                table: 'kp',
                param: '',
            }, getStation);
        }
    }
};