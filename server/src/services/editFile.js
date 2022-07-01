const fs = require('fs/promises');
const { formatData, validateData, getTotalSum }= require('../helpers/helpers');

async function editFile(req, res) {
    let data = {food: req.body.food, electronics: req.body.electronics, cloths: req.body.cloths, utensils: req.body.utensils};
    let budget = Number(req.body.budget);


    const isValid = validateData(data);
    const totalSum = getTotalSum(data);

    if (isValid && totalSum <= budget) {
        fs.writeFile(`./uploads/${req.body.filename}`, JSON.stringify(data), {
            encoding: 'utf8',
            flag: 'w'
          })

        res.status(200).json(budget - totalSum);
    } else {
        data.filename = req.body.filename;
        res.status(400).json({data, error: 'Try again.'});
    }
}



module.exports = {
    editFile
}