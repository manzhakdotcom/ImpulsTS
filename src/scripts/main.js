

window.App = {};

window.App.select = Select();
window.App.search = Search();

new Popup().init({
    button: '#modal-button',
    title: 'Импульсы ТС',
    content: '<b>Да</b> - есть сигнализация, <b>Нет</b> - нет сигнализации.'
});
