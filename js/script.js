var geron = {
	createForm:function () {
		var parentEl = document.querySelector("#formula");
		var docFrag = document.createDocumentFragment();
		for (var i = 0, inputEl, id = ["a", "b", "c"]; i < 3; i++){
			inputEl = document.createElement("input");
			//
			inputEl.setAttribute("type", "number");
			inputEl.setAttribute("min", "0");
			inputEl.setAttribute("max", "999");
			inputEl.setAttribute("id", id[i]);
			inputEl.setAttribute("placeholder", "Сторона "+id[i]);
			inputEl.value = Math.floor(Math.random()*(1000));
			
			docFrag.appendChild(inputEl);
		}
		//console.log(docFrag);		
		parentEl.appendChild(docFrag);
			
	},
	formula:function(data){
		var p = (Number(data[0])+Number(data[1])+Number(data[2]))/2;

		var S = Math.sqrt(p*(p-data[0])*(p-data[1])*(p-data[2]));

		return isNaN(S)?"Такого треугольника не существует":S;

	},
	
	checkForm:function(){
		var data = [
			document.querySelector("#a").value,
			document.querySelector("#b").value,
			document.querySelector("#c").value
		];
		//console.log(data);
		for(var i=0; i<data.length; i++){
			if(data[i] == "") return "Введите все стороны";
			if(data[i] == "0") return "Нельзя ноль";
		};

		return geron.formula(data);

	},
	resultForm:function(){
		if(document.querySelector("h4")) document.querySelector("h4").remove();
		var parentEl = document.querySelector("#formula");

		var selectorEl = document.createElement("h4");
		var textEl = document.createTextNode("Результат: " + geron.checkForm());
		selectorEl.appendChild(textEl);
		if (isNaN(+geron.checkForm())) {
			selectorEl.style.color = "red";
			
		} else {
			selectorEl.style.color = "green";
		}
		parentEl.appendChild(selectorEl);


	},
	windowBG:function(){
		document.body.style.backgroundColor = "rgb("+geron.randomRGB()+", "+geron.randomRGB()+", "+geron.randomRGB()+")";
	},
	randomRGB:function(){
		var rand = 199 + Math.random()*(225+1 - 199);
		rand = Math.floor(rand);
		return rand;
	}
};
geron.windowBG();
geron.createForm();
setInterval(function(){geron.resultForm()}, 0);

/*(function() {
	var results;
	this.assert = function assert( value, desc ) {
		var li = document.createElement("li");
		li.className = value ? "pass" : "fail";
		li.appendChild(document.createTextNode( desc ) );
		results.appendChild( li );
		if(!value) {
			li.parentNode.parentNode.className = "fail";
		}
		return li;
	};
	this.test = function test( name, fn ) {
		results = document.querySelector("#results");
		results = assert(true, name).appendChild(document.createElement("ul"));
		fn();
	};
})();

window.onload = function() {
	test("A test.", function(){
		assert(true, "first assertion comleted");
		assert(true, "second assertion comleted");
		assert(true, "third assertion comleted");
	});	
	test("Another test.", function(){
		assert(true, "first assertion comleted");
		assert(false, "second assertion comleted");
		assert(true, "third assertion comleted");
	});	
	test("A third test.", function(){
		assert(null, "fail");
		assert(5, "pass");
	});
};*/

(function() {
	var queue = [], paused = false, results;
	this.assert = function assert( value, desc ) {
		var li = document.createElement("li");
		li.className = value ? "pass" : "fail";
		li.appendChild(document.createTextNode( desc ) );
		results.appendChild( li );
		if(!value) {
			li.parentNode.parentNode.className = "fail";
		}
		return li;
	};
	this.test = function test( name, fn ) {
		queue.push( function() {
			results = document.querySelector("#results");
			results = assert(true, name).appendChild(document.createElement("ul"));
			fn();
		});
		runTest();
	};
	this.pause = function() {
		paused = true;
	};
	this.resume = function() {
		paused = false;
		setTimeout( runTest, 1 );
	};

	this.useless = function(callback) {
		return callback(); 
	};


	function runTest() {
		if (!paused && queue.length) {
			queue.shift()();
			if( !paused ) {
				resume();
			}
		}
	}

	



})();

function isNimble() { return true; }

var canFly = function() { return true; };

/*Start scope function*/




/*End scope function*/

window.onload = function() {
	/*
	test("Async test #1", function(){
		pause();
		setTimeout( function() {
			assert(true, "First test completed");
			resume();
		}, 1000 );
	});
	test("Async test #2", function(){
		pause();
		setTimeout( function() {
			assert(false, "Second test completed");
			resume();
		}, 1000 );
	});

	test("Async test #3", function(){
		var text = "Domo arigato!";
		assert(useless(function(){return text;}) === text, "The useless function work! " + text);
		
	});	


	
	test("Test #1", function(){
		assert(typeof window.isNimble === "function", "isNimble() defined");
		assert( isNimble.name === "isNimble", "isNimble() has a name");
	});	

	test("Test #2", function(){
		assert(typeof window.canFly === "function", "canFly() defined");
		assert( canFly.name === "canFly", "canFly() has no name");
	});

	*/

	/*Start scope function*/

	test("Test scope", function(){
		assert(true, "|----- BEFORE OUTER -----|");

		assert(typeof outer === "function", "outer() is in scope");

		function outer() {
			assert(true, "|----- INSIDE OUTER, BEFORE a -----|");
			scopeTest();

			var a = 1;
			assert(true, "|----- INSIDE OUTER, AFTER a -----|");
			scopeTest();

		}
	});
	

	/*End scope function*/



};

