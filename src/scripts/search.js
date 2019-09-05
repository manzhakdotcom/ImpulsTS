class Search {

    constructor() {}

    createInput() {
        let select = document.querySelectorAll('.modal-wrapper select')[0],
            input = document.createElement('input');
        input.id = 'search';
        input.placeholder = 'Поиск импульса...';
        select.insertAdjacentHTML('afterEnd', input.outerHTML);

    }

    search() {
        // Declare letiables
        let input = document.getElementById('search'),
            filter = input.value.toUpperCase(),
            div = result.getElementsByTagName('div'),
            result = document.getElementById("result");

        // Loop through all list items, and hide those who don't match the search query
        for (let i = 0; i < div.length; i++) {
            //a = div[i].getElementsByTagName("a")[0];
            let txtValue = div[i].textContent || div[i].innerText;
            txtValue = txtValue.split('∟');

            if (txtValue[0].toUpperCase().indexOf(filter) > -1) {
                div[i].style.display = "";
            } else {
                div[i].style.display = "none";
            }
        }
    }

    listener() {
        let input = document.getElementById('search');
        input.addEventListener('input', e => this.search());

    }

    init() {
        this.createInput();
        this.listener();
    }
}