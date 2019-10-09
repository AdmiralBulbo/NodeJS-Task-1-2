var genders = ['Male', 'Female', 'Transgender', 'Cisgender', 'Genderfluid', 'Intersex'];


class Company {
    constructor(name, city) {
        this._name = name;
        this._city = city;
        this._workers = [];
    }
    hireWorker(newWorker) {
        if (newWorker.constructor.name == "FactoryWorker") {
            this._workers.push(newWorker);
            console.log('Worker with name ' + newWorker.name + ' was hired.')
        } else {
            console.log('Worker with name ' + newWorker.name + ' can not be hired because he is not a Factory Worker.')
        }
    }
    getWorkersList() {
        console.log('-Workers of ' + this._name + ' company- ');
        this._workers.forEach((value) => {
            console.log('Name: ' + value.name + ', Position: ' + value.position);
        })
    }
    removeWorker(workerName) {
        let flag;
        for ( var i = 0; i < this._workers.length; i++)
        {
            if (this._workers[i].name == workerName)
            {
                this._workers.splice(i, 1);
                console.log('Worker with name ' + workerName + ' was fired from the company.');
                flag = true;
            }
        }
        if (!flag) 
        {
            console.log('There is no worker with name ' + workername + ' in this company.');
        }
    }
}

class Worker {
    constructor(name, age, sex) {
        this._name = name;
        this._age = age;
        this._sex = sex;
    }

    get name() {
        return this._name;
    }
    get age() {
        return this._age;
    }
    get sex() {
        return this._sex;
    }

    set name(newName) {
        if (newName.length < 20) {
            this._name = newName;
        } else {
            console.log('Name "' + newName + '" is too long.')
        }
    }
    set age(newAge) {
        if (newAge > 65) {
            console.log('You are too old to become a worker.')
        } else if (newAge < 16) {
            console.log('You are too young to become a worker.')
        } else {
            this._age = newAge;
        }
    }
    set sex(newSex) {
        let flag;
        genders.map((value) => {
            if (newSex == value) {
                this._sex = newSex;
                flag = true;
            }
        })
        if (!flag) {
            console.log('Try another gender.')
        }
    }

    getAllInfo() {
        console.log('-Worker info-\nName: ' + this._name + '\nAge: ' + this._age + '\nGender: ' + this._sex);
    }
}

class FactoryWorker extends Worker {
    constructor(name, age, sex, position) {
        super(name, age, sex);
        this._position = position;
    }

    get position() {
        return this._position;
    }

    set position(position) {
        this._position = position;
    }

    getAllInfo() {
        console.log('-Factory worker info-\nName: ' + this._name + '\nAge: ' + this._age +
            '\nGender: ' + this._sex + '\nPosition: ' + this._position);
    }
}

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