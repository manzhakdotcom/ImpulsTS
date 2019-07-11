'use strict';

function App() {
    this.run = function (event) {
        event.preventDefault();
        getData();
        console.log(responseData);

    };

    var myRequest = null;
    var responseData = null;

    function getData() {
        myRequest = new XMLHttpRequest();
        myRequest.onreadystatechange = getResponse;
        myRequest.open('GET', 'getData.php', true);
        myRequest.setRequestHeader('Content-Type', 'application/json');
        myRequest.send();
    }

    function getResponse() {
        try {
            if (myRequest.readyState == XMLHttpRequest.DONE) {
                switch (myRequest.status) {
                    case 500:
                        break;
                    case 404:
                        break;
                    case 200:
                        responseData = JSON.parse(myRequest.responseText);
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



