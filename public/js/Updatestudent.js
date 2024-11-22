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

    var jsonData = {
        name: document.getElementById("editName").value.trim(),
        Address: document.getElementById("editAddress").value.trim(),
        Gender: document.getElementById("editGender").value.trim()
    };

    // Clear previous validation message
    document.getElementById("editMessage").innerHTML = '';
    document.getElementById("editMessage").classList.remove('text-danger', 'text-success');

    // Validate Name
    if (!/^[A-Za-z\s]{2,50}$/.test(jsonData.name)) {
        document.getElementById("editMessage").innerHTML = 'Name must be between 2 and 50 characters and contain only letters and spaces!';
        document.getElementById("editMessage").classList.add('text-danger');
        return;
    }

    // Validate Address
    if (!/^[a-zA-Z0-9\s,.'-]{5,200}$/.test(jsonData.Address)) {
        document.getElementById("editMessage").innerHTML = 'Address must be alphanumeric and between 5 and 200 characters!';
        document.getElementById("editMessage").classList.add('text-danger');
        return;
    }

    // Validate Gender
    if (!/^(Male|Female|Other)$/.test(jsonData.Gender)) {
        document.getElementById("editMessage").innerHTML = 'Gender must be one of the following: Male, Female, or Other!';
        document.getElementById("editMessage").classList.add('text-danger');
        return;
    }

    var request = new XMLHttpRequest();
    request.open("PUT", "/update-Student/" + studentId, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        var response = JSON.parse(request.responseText);
        if (response.message == "Student modified successfully!") {
            document.getElementById("editMessage").innerHTML = 'Edited Resource: ' + jsonData.name + '!';
            document.getElementById("editMessage").classList.add('text-success');
            window.location.href = 'index.html';
        } else {
            document.getElementById("editMessage").innerHTML = 'Unable to edit student!';
            document.getElementById("editMessage").classList.add('text-danger');
        }
    };
    request.send(JSON.stringify(jsonData));
}
