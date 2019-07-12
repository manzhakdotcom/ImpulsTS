'use strict';

function App() {
    var _responseData = '';
    var _myRequest = '';
    this.run = function (event) {
        event.preventDefault();
        _getData();
        this.getResponseData();
    };
    

    function _getData() {
        _myRequest = new XMLHttpRequest();
        _myRequest.onreadystatechange = _getResponse;
        _myRequest.open('GET', 'getData.php', true);
        _myRequest.setRequestHeader('Content-Type', 'text/pain;charset=UTF-8');
        _myRequest.send(null); //null так как get запрос
    }

    this.getResponseData = function() {
        console.log(_responseData);
    }

    function _getResponse() {
        try {
            if (_myRequest.readyState == XMLHttpRequest.DONE) {
                switch (_myRequest.status) {
                    case 500:
                        break;
                    case 404:
                        break;
                    case 200:
                        var type =  _myRequest.getResponseHeader('Content-Type');
                        console.log(type);
                        if(type.match('/json')) {
                            _responseData = JSON.parse(_myRequest.responseText);
                        }
                        
                        break;
                }
            }
        }
        catch (ex) {
            console.log('Ajax error: ' + ex.Description);
        }
    }
}

var app = new App();



