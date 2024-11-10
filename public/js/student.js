function addStudent() {
    var response = "";
    var jsonData = new Object();
    jsonData.name = document.getElementById("name").value;
    jsonData.Address = document.getElementById("Address").value;
    jsonData.Gender = document.getElementById("Gender").value;
    if (jsonData.name == "" || jsonData.Address == "" || jsonData.Gender == "") {
        document.getElementById("message").innerHTML = 'All fields are required!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }

    var request = new XMLHttpRequest();
    request.open("POST", "/add-Student", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response)
        if (response.message == undefined) {
            document.getElementById("message").innerHTML = 'Added Student: ' +
                jsonData.name + '!';
            document.getElementById("message").setAttribute("class", "text-success");
            document.getElementById("name").value = "";
            document.getElementById("Address").value = "";
            document.getElementById("Gender").value = "";
            window.location.href = 'index.html';
        }
        else {
            document.getElementById("message").innerHTML = 'Unable to add Student!';
            document.getElementById("message").setAttribute("class", "textdanger");
            document.getElementById("message").setAttribute("class", "text-danger");
        }
    };
    request.send(JSON.stringify(jsonData));
}

function editStudent(data) {
    var selectedStudent = JSON.parse(data);
    document.getElementById("editName").value = selectedStudent.name;
    document.getElementById("editAddress").value = selectedStudent.Address;
    document.getElementById("editGender").value = selectedStudent.Gender;

    var updateButton = document.getElementById("updateButton");
    updateButton.setAttribute("data-id", selectedStudent.id); 
    $('#editstudentModal').modal('show');
}


function updateStudent() {
    var studentId = document.getElementById("updateButton").getAttribute("data-id");

    console.log(studentId); 

    var response = "";
    var jsonData = new Object();
    jsonData.name = document.getElementById("editName").value;
    jsonData.Address = document.getElementById("editAddress").value;
    jsonData.Gender = document.getElementById("editGender").value;

    if (jsonData.name == "" || jsonData.Address == "" || jsonData.Gender == "") {
        document.getElementById("editMessage").innerHTML = 'All fields are required!';
        document.getElementById("editMessage").setAttribute("class", "text-danger");
        return;
    }

    var request = new XMLHttpRequest();
    request.open("PUT", "/update-Student/" + studentId, true); 
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "Student modified successfully!") {
            document.getElementById("editMessage").innerHTML = 'Edited Resource: ' + jsonData.name + '!';
            document.getElementById("editMessage").setAttribute("class", "text-success");
            window.location.href = 'index.html';  
        } else {
            document.getElementById("editMessage").innerHTML = 'Unable to edit student!';
            document.getElementById("editMessage").setAttribute("class", "text-danger");
        }
    };
    request.send(JSON.stringify(jsonData));
}


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


            '<button type="button" class="btn btn-danger" onclick="deleteStudent(' + response[i].id + ')"> Delete</button>' +
                '</td>' +
                '</tr>'
        }
        document.getElementById('tableContent').innerHTML = html;
    };
    request.send();
}