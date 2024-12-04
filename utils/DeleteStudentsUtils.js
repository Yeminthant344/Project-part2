const { Student } = require('../models/Student');
const fs = require('fs').promises;

async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
        throw err;
    }
}

async function writeJSON(object, filename) {
    try {
        await fs.writeFile(filename, JSON.stringify(object, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing file:', err);
        throw err;
    }
}

async function deleteStudent(req, res) {
    try {
        const id = req.params.id;

        // Comprehensive ID validation
        if (!id || !(/^\d+$/.test(id))) {
            return res.status(400).json({ message: 'Valid student ID is required' });
        }

        // Logging for tracking
        console.log(`Attempting to delete student with ID: ${id}`);

        const allStudents = await readJSON('utils/students.json');

        // Check if student list is empty
        if (allStudents.length === 0) {
            return res.status(404).json({ message: 'No students available to delete' });
        }

        const initialLength = allStudents.length;
        const filteredStudents = allStudents.filter(student => student.id !== id);

        // Check if student was actually deleted
        if (filteredStudents.length === initialLength) {
            return res.status(404).json({ message: 'Student not found' });
        }

        await writeJSON(filteredStudents, 'utils/students.json');

        return res.status(200).json({ 
            message: 'Student deleted successfully!', 
            remainingStudents: filteredStudents.length 
        });
    } catch (error) {
        console.error('Comprehensive delete student error:', error);
        return res.status(500).json({ 
            message: 'Server error during student deletion', 
            error: error.message 
        });
    }
}

module.exports = { deleteStudent, readJSON, writeJSON, Student };

/*async function deleteStudent(req, res) {
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

module.exports = {
    deleteStudent

};*/