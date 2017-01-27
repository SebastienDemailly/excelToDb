const excelToJson = require('convert-excel-to-json');
//https://github.com/DiegoZoracKy/convert-excel-to-json

module.exports = {
    convert: function(excelFilePath) {
        return result = excelToJson({
            sourceFile: excelFilePath,
            outputJSON: true,
            sheets: [{
                name: 'candidats',
                header: {
                    rows: 3
                },
                columnToKey: {
                    A: 'id',
                    B: 'party',
                    C: 'label',
                    D: 'listNumber',
                    E: 'reference',
                    F: 'paperWeight',
                    G: 'paperSize'
                }
            }, {
                name: 'communes',
                header: {
                    rows: 3
                },
                columnToKey: {
                    A: 'distributor',
                    B: 'leadDistributor',
                    C: 'inseeCode',
                    D: 'cantonCode',
                    E: 'city',
                    F: 'arrondissement',
                    G: 'email',
                    H: 'address',
                    I: 'postCode',
                    J: 'contact',
                    K: 'phone',
                    L: 'openingHours',
                    M: 'elector',
                    N: 'quantity'
                }
            }, {
                name: 'insertion',
                header: {
                    rows: 3
                },
                columnToKey: {
                    A: 'candidatNumber',
                    B: 'inseeCode',
                    C: 'insertion'
                }
            }]
        });
    }
}
