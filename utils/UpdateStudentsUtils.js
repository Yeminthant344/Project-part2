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

async function updateStudent(req, res) {
    try {
        const id = req.params.id;
        const { name, Address, Gender } = req.body;

        // Validate fields server-side
        // Name: only letters and spaces, length between 2 and 50 characters
        if (!/^[A-Za-z\s]{2,50}$/.test(name)) {
            return res.status(400).json({ message: 'Name must be between 2 and 50 characters and contain only letters and spaces!' });
        }

        // Address: alphanumeric and between 5 and 200 characters
        if (!/^[a-zA-Z0-9\s,.'-]{5,200}$/.test(Address)) {
            return res.status(400).json({ message: 'Address must be alphanumeric and between 5 and 200 characters!' });
        }

        // Gender: must be "Male", "Female", or "Other"
        if (!/^(Male|Female|Other)$/.test(Gender)) {
            return res.status(400).json({ message: 'Gender must be one of the following: Male, Female, or Other!' });
        }

        const allStudents = await readJSON('utils/students.json');
        let modified = false;

        for (let i = 0; i < allStudents.length; i++) {
            const currentStudent = allStudents[i];
            if (currentStudent.id === id) {
                // Update student fields
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
            return res.status(404).json({ message: 'Student not found!' });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { updateStudent, readJSON, writeJSON, Student};