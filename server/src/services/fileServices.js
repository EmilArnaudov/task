const fs = require('fs/promises');
const { formatData, validateData, getTotalSum }= require('../helpers/helpers');

async function handleFile(req, res) {
    let data = await fs.readFile(`./uploads/${req.file.filename}`, { encoding: 'utf8' });
    data = JSON.parse(data);
    let budget = Number(req.body['budget']);
    const formattedData = formatData(data);
    const isDataValid = validateData(formattedData);
    const totalSum = getTotalSum(formattedData);
    

    if (isDataValid && totalSum <= budget) {
        res.status(200).json(budget - totalSum);
    } else {
        formattedData.filename = req.file.filename;
        res.status(400).json({data: formattedData, error: 'Invalid order.'});
    }

}



module.exports = {
    handleFile
}