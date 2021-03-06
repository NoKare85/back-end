async function getTasks() {
    res = await fetch("/tasks/")
    .then(response => response.json())
    .then(data => document.getElementById("console").innerHTML = "<pre>" + JSON.stringify(data, null, '\t') + "</pre>");
}

async function getOneTask(id) {
    const task = await fetch("/tasks/"+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => document.getElementById("console").innerHTML = "<pre>" + JSON.stringify(data, null, '\t') + "</pre>");
}

async function getUsers() {
    res = await fetch("/users/")
    .then(response => response.json())
    .then(data => document.getElementById("console").innerHTML = "<pre>" + JSON.stringify(data, null, '\t') + "</pre>");
}

async function getOneUser(id) {
    const task = await fetch("/users/"+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => document.getElementById("console").innerHTML = "<pre>" + JSON.stringify(data, null, '\t') + "</pre>");
}

async function deleteOneUser(id) {
    res = await fetch("/users/"+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => document.getElementById("console").innerHTML = "<pre>" + JSON.stringify(data, null, '\t') + "</pre>");;
}

async function deleteOneTask(id) {
    res = await fetch("/tasks/"+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => document.getElementById("console").innerHTML = "<pre>" + JSON.stringify(data, null, '\t') + "</pre>");
}

async function deleteTask(id) {
    res = await fetch("/tasks/"+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    location.reload();
}

function doTask(id) {
    //document.getElementById().parentElement.pare
    if (id.classList.contains('fa-check-square')) {
       id.parentElement.parentElement.style.display = "block";
    } else {
        id.parentElement.parentElement.style.display = "none";
    }
}

function newTask() {
    document.getElementById("addForm").classList.remove("d-none");
    document.getElementById("addForm").classList.add("d-block")
}

function newUser() {
    document.getElementById("firstname").classList.remove("d-none");
    document.getElementById("lastname").classList.remove("d-none");
    document.getElementById("firstname").classList.add("d-block");
    document.getElementById("lastname").classList.add("d-block");
    document.getElementsByName("title")[0].disabled = true;
    document.getElementsByName("description")[0].disabled = true;
    document.getElementById("newuser").disabled = true;
    document.getElementById("saveuser").classList.remove('d-none');
    document.getElementById("saveuser").classList.add('d-block')
}

async function saveUser() {
    var data = JSON.stringify({
            firstname: document.getElementsByName("firstname")[0].value,
            lastname: document.getElementsByName("lastname")[0].value
        });
    var res = await fetch("/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    document.getElementById("firstname").classList.remove("d-block");
    document.getElementById("lastname").classList.remove("d-block");
    document.getElementById("firstname").classList.add("d-none");
    document.getElementById("lastname").classList.add("d-none");
    document.getElementById("saveuser").classList.add('d-none');
    document.getElementById("newuser").disabled = false;
    location.reload();
    document.getElementById("addForm").classList.remove("d-none");
    document.getElementById("addForm").classList.add("d-block")
}

async function showForm(id) {

    const task = await fetch("/tasks/"+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    var obj = JSON.parse(JSON.stringify(await task.json()));
    document.getElementById("updateForm").classList.remove("d-none")
    document.getElementById("updateForm").classList.add("d-block");
    document.getElementById("id").value = obj._id;
    document.getElementById("title").value = obj.title;
    document.getElementById("description").value = obj.description;
    document.getElementById("assignee").value = obj.assignee;
}