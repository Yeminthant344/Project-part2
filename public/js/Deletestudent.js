function deleteStudent(selectedId) {
    var response = "";
    var request = new XMLHttpRequest();
    request.open("DELETE", "/delete-Student/" + selectedId, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "student deleted successfully!") {
            window.location.href = 'index.html';
        }
        else {
            alert('Unable to delete student!');
        }
    };
    request.send();
}