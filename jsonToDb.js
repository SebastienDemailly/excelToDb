var _ = require('underscore');
//http://underscorejs.org/

module.exports = {
    insert: function(json) {
        // ouvrir une transaction

        // insertion des référencesTypes
        var referenceTypes = (_.uniq(_.pluck(json.candidats, 'label')))
        for (referenceType of referenceTypes) {
            console.log("Insertion referenceTypes :" + "label: " + referenceType)
                /*  ReferenceType.create({
                      label: referencesType
                  });*/
        };

        // insertion des format
        var formats = (_.uniq(_.pluck(json.candidats, 'paperSize')))
        for (format of formats) {
            console.log("Insertion formats :" + "paperSize: " + format)
                /*Format.create({
                    label: format
                });*/
        };

        // insertion des bureaux distributeurs
        var distributors = (_.uniq(_.pluck(json.communes, 'distributor')))
        for (distributor of distributors) {
            console.log("Insertion distributors :" + "distributor: " + distributor)
                /*Distributor.create({
                    label: distributor
                });*/
        };

        // insertion des  districts
        var districts = (_.uniq(_.pluck(json.communes, 'leadDistributor')))
        for (district of districts) {
            console.log("Insertion districts :" + "leadDistributor: " + district)
                /*District.create({
                    label: district
                });*/
        };

        // insertion des  cities
        for (city of json.communes) {
            // récupération de l'idDistributor
            console.log("SELECT id FROM distributor WHERE label = " + city.distributor);
            // récupération de l'idDistrict
            console.log("SELECT id FROM district WHERE label = " + city.leadDistributor);
            console.log("Insertion cities :" + city.inseeCode + " | " + city.cantonCode + " | " + city.city + " | " + city.arrondissement + " | " + city.email + " | " + city.address + " | " + city.postCode + " | " + city.contact + " | " + city.phone + " | " + city.openingHours + " | " + city.elector + " | " + city.quantity);
            /*City.create({
            inseeCode: city.inseeCode,
            cantonCode: city.cantonCode,
            city: city.city,
            arrondissement: city.arrondissement,
            email: city.email,
            address: city.address,
            postCode: city.postCode,
            contact: city.contact,
            phone: city.phone,
            openingHours: city.openingHours,
            elector: city.elector,
            quantity: city.quantity,
            idDistributor : "L'ID DE LA REQUETE DE RECUPERATION",
            idDistrict : "L'ID DE LA REQUETE DE RECUPERATION"
            });*/
        };

        // insertion des  references
        for (reference of json.candidats) {
            // récupération de l'idReferenceType
            console.log("SELECT id FROM referencetype WHERE label = " + reference.label);
            // récupération de l'idFormat
            console.log("SELECT id FROM format WHERE paperSize = " + reference.paperSize);
            console.log("Insertion references :" + reference.id + " | " + reference.party + " | " + reference.listNumber + " | " + reference.reference + " | " + reference.paperWeight);
            /*Reference.create({
            id: reference.id,
            party: reference.party,
            listNumber: reference.listNumber,
            reference: reference.reference,
            paperWeight: reference.paperWeight,
            idFormat: "L'ID DE LA REQUETE DE RECUPERATION",
            idCandidat: "L'ID DE LA REQUETE DE RECUPERATION"
            });*/
        };

        // insertion des  cityReferences
        for (cityReference of json.insertion) {
            // récupération de l'idReference
            console.log("SELECT id FROM reference WHERE id = " + cityReference.candidatNumber);
            // récupération de l'idCity
            console.log("SELECT id FROM city WHERE inseeCode = " + cityReference.inseeCode);
            console.log("Insertion cityReferences :" + cityReference.insertion);
            /*CityReference.create({
            insertion: cityReference.insertion,
            inseeCode: "L'ID DE LA REQUETE DE RECUPERATION",
            candidatNumber: "L'ID DE LA REQUETE DE RECUPERATION"
            });*/
        };
        // fermer la transaction
        return true;
    }
}
