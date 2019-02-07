(function(){
	document.querySelector("#btn-preview-ui").addEventListener("click", function(){
		var preview = document.querySelector(".preview-ui");
		var form = document.querySelector(".form-ui");
		preview.className = "preview-ui hide";
		form.className = "form-ui";
	});
})();

