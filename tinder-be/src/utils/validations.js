const validator = require("validator");

const fieldsToBeUpdated = ((fields) => {
    let isValid = false;
    const ALLOWED_UPDATES = ['firstName', 'lastName', 'age', 'password', 'gender', 'skills', 'photoUrl'];
    isValid = Object.keys(fields).every((k) => ALLOWED_UPDATES.includes(k))
    if (isValid) return true;
})

const validateFields = ((fields) => {
    console.log("fields to be validated: ", fields);
    const { firstName, lastName, emailId, password, age, gender, phototUrl, skills } = fields;
    if (!firstName || !lastName) {
        throw new Error("First Name and Last Name are required");
    } else if (!validator.isAlpha(firstName) || !validator.isAlpha(lastName)) {
        throw new Error("First Name and Last Name should contain only alphabets");
    }
    if (!emailId || !validator.isEmail(emailId)) {
        throw new Error("Please enter a valid emailId -" + emailId);
    }
    if (!password || !validator.isStrongPassword(password, { minLength: 8 })) {
        console.log("Password is valid- ", password);
        throw new Error("Password should be at least 8 characters long and contain a mix of letters, numbers, and symbols");
    }
    if (age && age < 18) {
        throw new Error("Age should be at least 18");
    }
    if (gender && !["male", "female", "others"].includes(gender) ) {
        throw new Error("Invalid gender!" + gender)
    }
    if (phototUrl && !validator.isURL(phototUrl)) {
        throw new Error("Invalid Photo URL!");
    }
    if (skills && skills.length > 10) {
        throw new Error("Skills should not exceed 10 items");
    }
})

module.exports = {
    fieldsToBeUpdated,
    validateFields
};