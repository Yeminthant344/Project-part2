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
async function addStudent(req, res) {
    try {
        const name = req.body.name;
        const Address = req.body.Address;
        const Gender = req.body.Gender;

        // Validation checks
        if (Address.length < 6) {
            return res.status(400).json({ message: 'Validation error: description too short' });
        } else {
            const newStudent = new Student(name, Address, Gender);
            const updatedStudents = await writeJSON(newStudent, 'utils/students.json');
            return res.status(201).json(updatedStudents);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function updateStudent(req, res) {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const Address = req.body.Address;
        const Gender = req.body.Gender;
        const allStudents = await readJSON('utils/students.json');
        var modified = false;
        for (var i = 0; i < allStudents.length; i++) {
            var curcurrStudent = allStudents[i];
            if (curcurrStudent.id == id) {
                allStudents[i].name = name;
                allStudents[i].Address = Address;
                allStudents[i].Gender = Gender;
                modified = true;
            }
        }
        if (modified) {
            await fs.writeFile('utils/students.json', JSON.stringify(allStudents), 'utf8');
            return res.status(201).json({ message: 'Student modified successfully!' });
        } else {
            return res.status(500).json({ message: 'Error occurred, unable to modify!' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function viewStudent(req, res) {
    try {
        const allResources = await readJSON('utils/students.json');
        return res.status(200).json(allResources);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    readJSON, writeJSON, addStudent,  updateStudent , viewStudent
};
