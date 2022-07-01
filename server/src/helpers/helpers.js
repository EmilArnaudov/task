const fs = require('fs/promises');

function formatData(data) {
    const keys = Object.keys(data);

    for (const key of keys) {
        let newKey = data[key].split('');
        newKey.shift();
        data[key] = newKey.join('');
    }

    return data;
}

function validateData(data) {
    let electronicsValid;
    let clothesValid;
    let utensilsValid;

    if (data.electronics) {
        electronicsValid = ((Number(data.food) * 30) / 100) > Number(data.electronics);
    }
    if (data.cloths) {
        clothesValid =  ((Number(data.food) * 50) / 100) > Number(data.cloths);
    }
    if (data.utensils) {
        utensilsValid = (Number(data.utensils) <= 6 && Number.isInteger((Number(data.utensils) / 0.5)))
    }

    return (electronicsValid === undefined || electronicsValid) && (clothesValid === undefined || clothesValid) && (utensilsValid === undefined || utensilsValid)
}

function getTotalSum(data) {
    let sum = 0;
    for (const key in data) {
        if (data[key]) {
            sum += Number(data[key]);
        }

    }

    return sum;
}


module.exports = {
    formatData,
    validateData,
    getTotalSum,

};