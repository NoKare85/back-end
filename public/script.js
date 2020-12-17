async function deleteTask(id) {
    res = fetch("http://localhost:3000/tasks/"+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    location.reload();
}