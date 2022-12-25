const mongoose = require("mongoose");

const isValid= function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
}

const isValidBody = function (object) {
    return Object.keys(object).length > 0;
}

const isValidName = function (name) {
    if (typeof name === "undefined" || name === null) return false;
    if (typeof name === "string" && name.trim().length === 0) return false;
    const nameRegex = /^[a-zA-Z ]+$/;
    return nameRegex.test(name);
}


const isValidPhone = function (num) {
    if (typeof num === "undefined" || num === null) return false;
    if (typeof num === "string" && num.trim().length === 0) return false;
    const reg = /^[0-9]{10}$/;
    return reg.test(num);
}
const isValidEmail = function (email) {
    if (typeof email === "undefined" || email === null) return false;
    if (typeof email === "string" && email.trim().length === 0) return false;
    const emailRegex = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
    return emailRegex.test(email);
}

const isValidDate = function (date) {
    const dateregex = /^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
    return dateregex.test(String(date));

}



module.exports = { isValid, isValidName, isValidEmail, isValidPhone, isValidBody,isValidDate  }