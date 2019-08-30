const Search = function(){

    function createInput() {
        let select = document.querySelectorAll('.modal-wrapper select')[0],
            input = document.createElement('input');
        input.id = 'search';
        input.placeholder = 'Поиск импульса...';
        select.insertAdjacentHTML('afterEnd', input.outerHTML);

    }
    function search() {
        // Declare letiables
        let input, filter, i, txtValue, div, result;
        input = document.getElementById('search');
        filter = input.value.toUpperCase();
        result = document.getElementById("result");
        div = result.getElementsByTagName('div');

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < div.length; i++) {
            //a = div[i].getElementsByTagName("a")[0];
            txtValue = div[i].textContent || div[i].innerText;
            txtValue = txtValue.split('∟');

            if (txtValue[0].toUpperCase().indexOf(filter) > -1) {
                div[i].style.display = "";
            } else {
                div[i].style.display = "none";
            }
        }
    }

    function listener() {
        let input = document.getElementById('search');
        input.addEventListener('input', search);

    }

    return {
        init: function () {
            createInput();
            listener();
        },
    };
};