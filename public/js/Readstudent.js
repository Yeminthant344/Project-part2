function viewStudent() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    var response = '';
    var request = new XMLHttpRequest();
    request.open('GET', '/view-Student', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response);

        const filteredStudents = response.filter(student =>
            student.name.toLowerCase().includes(searchValue)
        );

        var html = ''
        for (var i = 0; i < filteredStudents.length; i++) {
            html += '<tr>' +
                '<td>' + (i + 1) + '</td>' +
                '<td>' + filteredStudents[i].name + '</td>' +
                '<td>' + filteredStudents[i].Address + '</td>' +
                '<td>' + filteredStudents[i].Gender + '</td>' +
                '<td>' +
                '<button type="button" class="btn btn-warning" onclick="editStudent(\'' + JSON.stringify(filteredStudents[i]).replace(/"/g, '&quot;') + '\')">Edit</button> ' +
                '<button type="button" class="btn btn-danger" onclick="deleteStudent(' + filteredStudents[i].id + ')"> Delete</button>' +
                '</td>' +
                '</tr>'
        }
        document.getElementById('tableContent').innerHTML = html;
        console.log('Table content updated');
    };
    request.send();
}
