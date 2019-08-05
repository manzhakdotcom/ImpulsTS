'use strict';

window.App = {};

window.App.popup = Popup();
window.App.select = Select();
window.App.search = Search();

window.App.popup.init({
    button: '#modal-button',
    title: 'Импульсы ТС',
    content: 'Импульс 0-есть сигнализация, 1-нет сигнализации.'
});












