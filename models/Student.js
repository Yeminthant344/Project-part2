class Student {
    constructor(name, Address, Gender) {
        this.name = name;
        this.Address = Address;
        this.Gender = Gender;

        const Enroll = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        this.id = Enroll + "" + random.toString().padStart(3, '0');
    }
}
module.exports = { Student }; 