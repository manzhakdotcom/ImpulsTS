class Select {

    constructor() {
        this.mnemo = [
            '20000',
            '10000',
            '10001',
            '40001',
            '40002',
            '90000',
            '90001',
        ];
    }

    ajax(opts) {
        return new Promise( (resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', opts.url + '?table=' + opts.table + '&param=' + opts.param, true);

            xhr.onload = function() {
                if (this.status == 200) {
                    resolve(this.responseText);
                } else {
                    var error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };

            xhr.onerror = function() {
                reject(new Error("Network Error"));
            };

            xhr.send();
        } );
    }

    setMnemoText(data){
        let new_data = JSON.parse(JSON.stringify(data));
        new_data.forEach(item => {
            if(this.mnemo.includes(item.mnemo_id)) {
                item.place = 'Участок';
            } else {
                item.place = 'Станция';
            }
        });
        console.log(new_data);
        return new_data;
    }

    handlerCheck(){
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

    static checked() {
        let el = document.querySelector('input[name=extend]');
        if (el.checked) {
            return 'block';
        } else {
            return 'none';
        }
    }

    showData(response) {
        let data = JSON.parse(response);
        if(data.hasOwnProperty('error')) {
            alert(data.error);
        }
        data = this.setMnemoText(data);
        let result = document.querySelectorAll('#result')[0];
        result.innerHTML = '';
        data.forEach(function (item) {
            let div = document.createElement('div');
            let sign = item.dev_desc == '1'?'Нет':'Да';
            div.innerHTML = item.sign + ' - ' + sign;
            div.innerHTML += `<span class="info" style="display: ${Select.checked()};">&angrt; id: ${item.val_id}, ip: ${item.interface}, id_shem: ${item.id_shem}, id_mnemo: ${item.mnemo_id}, signal: ${item.dev_desc}, ${item.place}</span>`;
            if(item.dev_desc == '0') {
                div.className ='alarm';
            }
            if(item.title !== null) {
                div.setAttribute('title', item.title);
            }
            result.appendChild(div);
        });
        this.handlerCheck();
    }

    getData(e) {
        let result = document.querySelectorAll('#result')[0];
        result.innerHTML = 'Загрузка импульсов...';
        document.getElementById('search').value = '';
        let data = this.ajax({
            url: 'php/getData.php',
            table: 'ts',
            param: e.target.value,
        });
        data.then(
            response => this.showData(response),
            error => console.log(`Rejected: ${error}`)
        );
    }

    getStations (opts) {
        let stations = this.ajax(opts);
        stations.then(
            response => this.createSelect(response),
            error => console.log(`Rejected: ${error}`)
        );
    }

    createSelect(response) {
        let data = JSON.parse(response);
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
        select.addEventListener('change', this.getData.bind(this));
    }

    createElement() {
        this.getStations({
            url: 'php/getData.php',
            table: 'kp',
            param: '',
        });


    }
}