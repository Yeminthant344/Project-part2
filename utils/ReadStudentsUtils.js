const fs = require('fs').promises;

async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) { 
        console.error(err); 
        throw err; 
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

module.exports = { readJSON, viewStudent };