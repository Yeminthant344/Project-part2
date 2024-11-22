const { addStudent } = require('./AddStudentsUtils');
const { updateStudent } = require('./UpdateStudentsUtils');
const { viewStudent } = require('./ReadStudentsUtils');
const { deleteStudent } = require('./DeleteStudentsUtils');

module.exports = {
    addStudent,
    updateStudent,
    viewStudent,
    deleteStudent
};
