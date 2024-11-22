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

async function updateStudent(req, res) {
    try {
        const id = req.params.id;
        const { name, address, gender } = req.body;

        // Comprehensive ID validation
        if (!id || id.trim() === '') {
            return res.status(400).json({ message: 'Valid student ID is required' });
        }

        // Detailed field validations
        if (!name || !address || !gender) {
            return res.status(400).json({ message: 'All fields are required for update' });
        }

        if (name.length < 2 || name.length > 50) {
            return res.status(400).json({ message: 'Name must be between 2-50 characters' });
        }

        if (address.length < 6 || address.length > 200) {
            return res.status(400).json({ message: 'Address must be between 6-200 characters' });
        }

        if (!['Male', 'Female', 'Other'].includes(gender)) {
            return res.status(400).json({ message: 'Invalid gender selection' });
        }

        // Logging for tracking
        console.log(`Attempting to update student with ID: ${id}`);

        const allStudents = await readJSON('utils/students.json');
        const studentIndex = allStudents.findIndex(student => student.id === id);

        if (studentIndex === -1) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Update student details
        allStudents[studentIndex] = {
            id,
            name,
            address,
            gender
        };

        await writeJSON(allStudents, 'utils/students.json');

        return res.status(200).json({ 
            message: 'Student updated successfully!', 
            student: allStudents[studentIndex] 
        });
    } catch (error) {
        console.error('Comprehensive update student error:', error);
        return res.status(500).json({ 
            message: 'Server error during student update', 
            error: error.message 
        });
    }
}

module.exports = { updateStudent, readJSON, writeJSON, Student };