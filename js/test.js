'use strict';

function User(name, age) {
    var self = this;//получение методов и свойств объекта для приватных методов 
    var SEX = ['male', 'female'];
    this.age = age || 10;
    this.sayHi = function() {
        alert('Hi, ' + name + ' - ' + SEX[0]);
        //onReady.call(this) - для решение проблемы с доступом к публичным свойствам и методам в приватных методах
        onReady();
    };

    this.getSex = function() {
        return SEX;
    };

    function onReady() {
        alert('Bey ' + self.age);
    };
};

function Admin(name) {
    User.apply(this, arguments);

    var parentGetSex = this.getSex;
    this.getSex = function() {
        alert('Child ' + parentGetSex());
    }

}


var adm = new Admin('Nik');

adm.sayHi();
adm.getSex();
console.log(adm.onReady());


