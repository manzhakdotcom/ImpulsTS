'use strict';

window.App = {};

window.App.popup = Popup();
window.App.select = Select();
window.App.search = Search();

window.App.popup.init({
    button: '#modal-button',
    title: 'Импульсы ТС',
    content: '<b>Есть</b> сигнализация, <b>Нет</b> сигнализации.'
});












