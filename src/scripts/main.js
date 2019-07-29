'use strict';
window.App = {};

window.App.popup = Popup();
window.App.select = Select();
window.App.ajax = Ajax();


window.App.popup.init({
    button: 'modal-trigger',
    content: 'modal-content',
});

window.App.ajax.init({
    url: 'php/getData.php',
    table: 'kp',
    param: '',
});










