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

async function addStudent(req, res) {
    try {
        const { name, address, gender } = req.body;
        
        // Comprehensive validation
        if (!name || !address || !gender) {
            return res.status(400).json({ message: 'Validation error' });
        }

        // Detailed validations
        if (name.length < 2 || name.length > 50) {
            return res.status(400).json({ message: 'Validation error' });
        }

        if (address.length < 6 || address.length > 200) {
            return res.status(400).json({ message: 'Validation error' });
        }

        if (!['Male', 'Female', 'Other'].includes(gender)) {
            return res.status(400).json({ message: 'Validation error' });
        }

        // Logging for tracking
        console.log(`Attempting to add student: ${name}, ${address}, ${gender}`);

        const newStudent = {
            id: Date.now().toString(),
            name,
            address,
            gender
        };

        const allStudents = await readJSON('utils/students.json');
        allStudents.push(newStudent);
        
        await writeJSON(allStudents, 'utils/students.json');
        
        return res.status(201).json(allStudents);
    } catch (error) {
        console.error('Comprehensive add student error:', error);
        return res.status(500).json({ 
            message: 'Server error during student addition', 
            error: error.message 
        });
    }
}

module.exports = { addStudent, readJSON, writeJSON, Student };