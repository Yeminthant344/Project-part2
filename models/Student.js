class Student {
    constructor(name, description) {
        this.name = name;
        this.description = description;

        const Enroll = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        this.id = Enroll + "" + random.toString().padStart(3, '0');
    }
}
module.exports = { Student }; 