//CREATE
function onCreate(ev) {
    ev.preventDefault();

    var data = JSON.stringify({
        "name": String(document.getElementById("cname").value),
        "age": String(document.getElementById("cage").value),
        "sex": String(document.getElementById("csex").value),
        "position": String(document.getElementById("cposition").value)
    })
    console.log(data);

    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            document.getElementById("createForm").dispatchEvent(new Event('submit'));
            formCleaner();
            onRead();
        }
    });

    xhr.open("POST", "http://localhost:3000/workers");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

//READ
function onRead() {
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            result = JSON.parse(this.response);
            var resultTBody = document.createElement('tbody');
            //resultTBody.id = 'rTBody';
            result.map(function (workers) {
                resultTBody.appendChild(parseWorkersToTableRow(workers));
            });
            console.log(this.response);
            var table = document.getElementById('rTBody').parentElement;
            table.replaceChild(resultTBody, document.getElementById('rTBody'));
            resultTBody.id = 'rTBody';
            console.log('Workers table succsesfully readed.');
        }
    });

    xhr.open("GET", "http://localhost:3000/workers");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

//READ BY ID
function onReadById(id) {
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            result = JSON.parse(this.response);

            //Used to fill update pop-up form with current values
            document.getElementById('uid').value = result['_id'];
            document.getElementById('uname').value = result['name'];
            document.getElementById('uage').value = result['age'];
            document.getElementById('uposition').value = result['position'];

            console.log('Workers table succsesfully readed by id.');
        }
    });

    xhr.open("GET", "http://localhost:3000/workers/" + id);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

//Table parser
function parseWorkersToTableRow(workers) {
    var row = document.createElement('tr');

    id = document.createElement('td');
    id.innerText = workers['_id'];
    row.appendChild(id);

    name1 = document.createElement('td');
    name1.innerText = workers['name'];
    row.appendChild(name1);

    age = document.createElement('td');
    age.innerText = workers['age'];
    row.appendChild(age);

    sex = document.createElement('td');
    sex.innerText = workers['sex'];
    row.appendChild(sex);

    position = document.createElement('td');
    position.innerText = workers['position'];
    row.appendChild(position);

    //Update button
    updatetd = document.createElement('td');
    updatetd.id = workers['_id'];
    updatebtn = document.createElement('button');
    updatebtn.className = "btn btn-outline-primary";
    updatebtn.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
    updatebtn.addEventListener('click', modalOpen);
    updatetd.appendChild(updatebtn);
    row.appendChild(updatetd);

    //Delete button
    deletetd = document.createElement('td');
    deletetd.id = workers['_id'];
    deletebtn = document.createElement('button');
    deletebtn.className = "btn btn-outline-danger";
    deletebtn.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
    deletebtn.addEventListener('click', onDelete);
    deletetd.appendChild(deletebtn)
    row.appendChild(deletetd);

    return row;
}

//UPDATE
function onUpdate(ev) {
    ev.preventDefault();

    var data = JSON.stringify({
        "name": String(document.getElementById("uname").value),
        "age": String(document.getElementById("uage").value),
        "sex": String(document.getElementById("usex").value),
        "position": String(document.getElementById("uposition").value)
    });
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            //console.log(this.responseText);
            onRead();
        }
    });

    xhr.open("PUT", "http://localhost:3000/workers/"+document.getElementById("uid").value);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);

    modalClose();
}

//DELETE
function onDelete() {
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            //console.log(this.responseText);
            onRead();
        }
    });

    xhr.open("DELETE", "http://localhost:3000/workers/"+this.parentNode.id);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
};

function modalOpen() {
    $("#modalContactForm").modal();
    onReadById(this.parentNode.id);
}

function modalClose() {
    $("#modalContactForm").modal('hide');
}

function formCleaner() {
    document.getElementById('cname').value = '';
    document.getElementById('cage').value = '';
    document.getElementById('cposition').value = '';
}

(function () {
    onRead();

    document.getElementById('cbutton').addEventListener(
        'click', onCreate
    );
    document.getElementById('rbutton').addEventListener(
        'click', onRead
    );
    document.getElementById('ubutton').addEventListener(
        'click', onUpdate
    );
    console.log('Handlers is set')
})()