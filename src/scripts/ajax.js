'use strict';

var app = new App();

function App() {
    this.data = '';
    this.run = function (event) {
        event.preventDefault();
        alert('hi');
        _getData(_getResponse);
    };

    var _getResponse = function(data) {
        console.log(data);
        this.data = data;
        console.log(this.data);
    }.bind(this);

    var _getData = function(callback) {
        var _myRequest = new XMLHttpRequest();
        _myRequest.onreadystatechange = function () {

            if (_myRequest.readyState === XMLHttpRequest.DONE && _myRequest.status === 200) {
                var type = _myRequest.getResponseHeader('Content-Type');
                if (type.match('/json')) {
                    callback(JSON.parse(_myRequest.responseText));
                }
            }
        };
        _myRequest.open('GET', 'php/getData.php', true);

        _myRequest.send(null); //null так как get запрос
    }

}





