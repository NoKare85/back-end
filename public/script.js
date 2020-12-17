async function deleteTask(id) {
    res = await fetch("http://localhost:3000/tasks/"+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    location.reload();
}