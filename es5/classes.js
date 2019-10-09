'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var genders = ['Male', 'Female', 'Transgender', 'Cisgender', 'Genderfluid', 'Intersex'];

var Company = function () {
    function Company(name, city) {
        _classCallCheck(this, Company);

        this._name = name;
        this._city = city;
        this._workers = [];
    }

    _createClass(Company, [{
        key: 'hireWorker',
        value: function hireWorker(newWorker) {
            if (newWorker.constructor.name == "FactoryWorker") {
                this._workers.push(newWorker);
                console.log('Worker with name ' + newWorker.name + ' was hired.');
            } else {
                console.log('Worker with name ' + newWorker.name + ' can not be hired because he is not a Factory Worker.');
            }
        }
    }, {
        key: 'getWorkersList',
        value: function getWorkersList() {
            console.log('-Workers of ' + this._name + ' company- ');
            this._workers.forEach(function (value) {
                console.log('Name: ' + value.name + ', Position: ' + value.position);
            });
        }
    }, {
        key: 'removeWorker',
        value: function removeWorker(workerName) {
            var flag = void 0;
            for (var i = 0; i < this._workers.length; i++) {
                if (this._workers[i].name == workerName) {
                    this._workers.splice(i, 1);
                    console.log('Worker with name ' + workerName + ' was fired from the company.');
                    flag = true;
                }
            }
            if (!flag) {
                console.log('There is no worker with name ' + workername + ' in this company.');
            }
        }
    }]);

    return Company;
}();

var Worker = function () {
    function Worker(name, age, sex) {
        _classCallCheck(this, Worker);

        this._name = name;
        this._age = age;
        this._sex = sex;
    }

    _createClass(Worker, [{
        key: 'getAllInfo',
        value: function getAllInfo() {
            console.log('-Worker info-\nName: ' + this._name + '\nAge: ' + this._age + '\nGender: ' + this._sex);
        }
    }, {
        key: 'name',
        get: function get() {
            return this._name;
        },
        set: function set(newName) {
            if (newName.length < 20) {
                this._name = newName;
            } else {
                console.log('Name "' + newName + '" is too long.');
            }
        }
    }, {
        key: 'age',
        get: function get() {
            return this._age;
        },
        set: function set(newAge) {
            if (newAge > 65) {
                console.log('You are too old to become a worker.');
            } else if (newAge < 16) {
                console.log('You are too young to become a worker.');
            } else {
                this._age = newAge;
            }
        }
    }, {
        key: 'sex',
        get: function get() {
            return this._sex;
        },
        set: function set(newSex) {
            var _this = this;

            var flag = void 0;
            genders.map(function (value) {
                if (newSex == value) {
                    _this._sex = newSex;
                    flag = true;
                }
            });
            if (!flag) {
                console.log('Try another gender.');
            }
        }
    }]);

    return Worker;
}();

var FactoryWorker = function (_Worker) {
    _inherits(FactoryWorker, _Worker);

    function FactoryWorker(name, age, sex, position) {
        _classCallCheck(this, FactoryWorker);

        var _this2 = _possibleConstructorReturn(this, (FactoryWorker.__proto__ || Object.getPrototypeOf(FactoryWorker)).call(this, name, age, sex));

        _this2._position = position;
        return _this2;
    }

    _createClass(FactoryWorker, [{
        key: 'getAllInfo',
        value: function getAllInfo() {
            console.log('-Factory worker info-\nName: ' + this._name + '\nAge: ' + this._age + '\nGender: ' + this._sex + '\nPosition: ' + this._position);
        }
    }, {
        key: 'position',
        get: function get() {
            return this._position;
        },
        set: function set(position) {
            this._position = position;
        }
    }]);

    return FactoryWorker;
}(Worker);

var worker = new Worker('Vasya', 18, 'Male');
var fworker1 = new FactoryWorker('Perry', 17, 'Transgender', 'Developer');
var fworker2 = new FactoryWorker('Polina Sergeevna', 20, 'Female', 'Cleaner');
var fworker3 = new FactoryWorker('Anna', 21, 'Female', 'Senior');

var company = new Company('LeverX', 'Minsk');

company.hireWorker(worker);
company.hireWorker(fworker1);
company.hireWorker(fworker2);
company.hireWorker(fworker3);

company.getWorkersList();

company.removeWorker('Perry');

company.getWorkersList();