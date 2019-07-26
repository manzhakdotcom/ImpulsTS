var db = [
    "drawLine",
    "drawCircle",
    "drawCircleMore",
    "fillLine",
    "fillCircle",
    "fillCircleMore"
];

function popupClearAndHide() {
    autocomplete_result.innerHTML = "";
    autocomplete_result.style.display = "none";
}

function updPopup() {
    if(!autocomplete.value) {
        popupClearAndHide();
        return;
    }
    var a = new RegExp("^" + autocomplete.value, "i");
    for(var x = 0, b = document.createDocumentFragment(), c = false; x < db.length; x++) {
        if(a.test(db[x])) {
            c = true;
            var d = document.createElement("p");
            d.innerText = db[x];
            d.setAttribute("onclick", "autocomplete.value=this.innerText;autocomplete_result.innerHTML='';autocomplete_result.style.display='none';");
            b.appendChild(d);
        }
    }
    if(c == true) {
        autocomplete_result.innerHTML = "";
        autocomplete_result.style.display = "block";
        autocomplete_result.appendChild(b);
        return;
    }
    popupClearAndHide();
}

autocomplete.addEventListener("keyup", updPopup);
autocomplete.addEventListener("change", updPopup);
autocomplete.addEventListener("focus", updPopup);