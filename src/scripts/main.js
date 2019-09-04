

window.App = {};

window.App.select = new Select();
window.App.search = new Search();

new Popup().init({
    button: '#modal-button',
    title: 'Импульсы ТС',
    content: '<b>Да</b> - есть сигнализация, <b>Нет</b> - нет сигнализации.'
});
