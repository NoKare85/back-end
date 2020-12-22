async function deleteTask(id) {
    res = await fetch("http://localhost:3000/tasks/"+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    location.reload();
}

function doTask(id) {
    console.log(id.parentElement.parentElement)
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
    await fetch("http://localhost:3000/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstname: document.getElementsByName("firstname")[0].value,
            lastname: document.getElementsByName("lastname")[0].value
        })
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

    const task = await fetch("http://localhost:3000/tasks/"+id, {
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