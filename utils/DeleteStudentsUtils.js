const { Student } = require('../models/Student');
const fs = require('fs').promises;

async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) { console.error(err); throw err; }
}

async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);
        await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
        return allObjects;
    } catch (err) { console.error(err); throw err; }
}

async function deleteStudent(req, res) {
    try {
        const id = req.params.id;
        const allStudents = await readJSON('utils/students.json');
        var index = -1;
        for (var i = 0; i < allStudents.length; i++) {
            var currentStudent = allStudents[i];
            if (currentStudent.id == id)
                index = i;
        }
        if (index != -1) {
            allStudents.splice(index, 1);
            await fs.writeFile('utils/students.json', JSON.stringify(allStudents), 'utf8');
            return res.status(201).json({ message: 'Student deleted successfully!' });
        } else {
            return res.status(500).json({ message: 'Error occurred, unable to delete!' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { deleteStudent, readJSON, writeJSON, Student};