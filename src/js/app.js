'use strict';

function App() {
    this.run = function (event) {
        event.preventDefault();
        this.getData(function (data) {
            document.getElementsById('data').innerHTML += data[0].sign;
            console.log(data[0].sign)
        });

    }

    this.getData = function (success) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                try {
                    success(JSON.parse(this.responseText));
                } catch (err) {
                    console.log(err.message + " in " + xhr.responseText);
                    return;
                }
            }
        };
        xhr.open('GET', 'getData.php', true);
        xhr.send();
    }


}

var app = new App();



