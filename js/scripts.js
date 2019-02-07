//существует сразу при инициализации скрипта
var first = 1;

//ES6 задание переменной
let second = 2;
// let существует когда код дойдет до {} 
const pi = 3.14;

//типы данных
var number = 5;
    Infinity
    NaN
var string = 'Hello!';
var sym = Symbol();
var boolean = true;
null;
    //ошибка языка
    typeof null //object 
undefined;
var obj = {};
//подтип объекта
typeof function(){} // function


var y = y || 10;
z && console.log(x, y, z);

//тернарный оператор
(num == 50) ? true : false;


//

switch(num) {
    case true:
        console.log('Ok');
        break;
    default:
        console.log(false);
        break;
}

//

while (num < 10 ) {
    console.log(num++);
}

do {
    console.log('Done');
} while (false);

//i++ выполняется после тела цикла
//i видно будет после цикла
for(let i=0; i < 8; i++){
    console.log(i);
}

//прерывание break, продолжение continue

var menu = {
    width: 300,
    height: 200,
    title: "Menu"
  };
  
  for (var key in menu) {
    // этот код будет вызван для каждого свойства объекта
    // ..и выведет имя свойства и его значение
  
    alert( "Ключ: " + key + " значение: " + menu[key] );
  }

// по умолчанию sort сортирует, преобразуя элементы к строке.
//мы передаём в sort() именно саму функцию compareNumeric , без вызова через скобки
// функция, передаваемая sort , должна иметь два аргумента

/*
 Функция должна возвращать:
Положительное значение, если a > b ,
Отрицательное значение, если a < b ,
Если равны – можно 0 , но вообще – не важно, что возвращать, их взаимный порядок не имеет значения.
*/

function compareNumeric(a, b) {
    if (a > b) return 1;
    if (a < b) return -1;
  }
  var arr = [ 1, 2, 15 ];
  arr.sort(compareNumeric);
  alert(arr);  // 1, 2, 15
/*
  Функцию compareNumeric для сравнения элементов‑чисел можно упростить до одной строчки.
  Эта функция вполне подходит для sort , так как возвращает положительное число, если a > b , отрицательное, если наоборот, и 0 , если числа
  равны.
*/


//Свойство __proto__ доступно во всех браузерах, кроме IE10‑

//Обратим внимание – прототип используется исключительно при чтении. Запись значения, например, rabbit.eats = value или удаление delete rabbit.eats – работает напрямую с объектом.

var animal = {
    eats: true
  };
  var rabbit = {
    jumps: true
  };
  rabbit.__proto__ = animal;


  //Объект, создаваемый при помощи Object.create(null) не имеет прототипа, а значит в нём нет лишних свойств. Для коллекции – как раз то, что надо.


  //Вызов obj.hasOwnProperty(prop) возвращает true , если свойство prop принадлежит самому объекту obj , иначе false .
  var animal = {
    eats: true
  };
  var rabbit = {
    jumps: true,
    __proto__: animal
  };
  alert( rabbit.hasOwnProperty('jumps') ); // true: jumps принадлежит rabbit
  alert( rabbit.hasOwnProperty('eats') ); // false: eats не принадлежит
  









