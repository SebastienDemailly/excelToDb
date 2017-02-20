var _ = require('underscore');
//http://underscorejs.org/
var asyncc = require('async');

module.exports = {
    insert: function(json, orderId) {
        return new Promise(function(resolve, reject) {
            console.log("--------------------- DEBUT INSERTION BDD ---------------------")
            initReferencesTypes(json).then(function() {
                return initFormats(json)
            }).then(function() {
                return initReferences(json)
            }).then(function() {
                return initDistributors(json)
            }).then(function() {
                return initDistricts(json, orderId)
            }).then(function() {
                return initCities(json)
            }).then(function() {
                return initCityReferences(json)
            }).then(function() {
                console.log("--------------------- FIN INSERTION BDD ---------------------")
                return resolve(true);
            }).catch(function(err) {
                reject(err);
            })
        })
    }
}

var initReferencesTypes = function(json) {
    console.log("********** Insertion ReferencesTypes Début **********")
    // insertion des référencesTypes
    return new Promise(function(resolve, reject) {
        var tabReferencesTypes = [];
        var referenceTypes = (_.uniq(_.pluck(json.candidats, 'label')));
        for (referenceType of referenceTypes) {
            tabReferencesTypes.push(
                ReferenceType.create({
                    label: referenceType
                })
            );
        }
        Promise.all(tabReferencesTypes).then(function(res) {
            console.log("********** Insertion ReferencesTypes Fin **********")
            return resolve(res);
        }).catch(function(err) {
            console.log("********** Insertion ReferencesTypes Erreur **********")
            return reject(err);
        })
    })
}

var initFormats = function(json) {
    console.log("********** Insertion Format Début **********")
    //    insertion des format
    return new Promise(function(resolve, reject) {
        var tabFormats = [];
        var formats = (_.uniq(_.pluck(json.candidats, 'paperSize')))
        for (format of formats) {
            tabFormats.push(
                Format.create({
                    label: format
                })
            );
        }
        Promise.all(tabFormats).then(function(res) {
            console.log("********** Insertion Format Fin **********")
            return resolve(res);
        }).catch(function(err) {
            console.log("********** Insertion Format Erreur **********")
            return reject(err);
        })
    })
}

var initReferences = function(json) {
    return new Promise(function(resolve, reject) {
        console.log("********** Insertion References Début **********")
        // insertion des  references
        var tabReferences = [];
        var tabFormats = [];
        var tabReferencesTypes = [];

        for (reference of json.candidats) {
            tabFormats.push(researchFormatId(reference.paperSize));
            tabReferencesTypes.push(researchReferenceTypeId(reference.label));
        }
        Promise.all(tabFormats).then(function(resFormats) {
            Promise.all(tabReferencesTypes).then(function(resReferencesTypes) {
                for (var i = 0; i < json.candidats.length; i++) {
                    tabReferences.push(
                        Reference.create({
                            id: json.candidats[i].id,
                            party: json.candidats[i].party,
                            listNumber: json.candidats[i].listNumber,
                            reference: json.candidats[i].reference,
                            paperWeight: json.candidats[i].paperWeight,
                            FormatId: resFormats[i],
                            ReferenceTypeId: resReferencesTypes[i]
                        })
                    )
                }
            }).then(function() {
                Promise.all(tabReferences).then(function(res) {
                    console.log("********** Insertion References Fin **********")
                    return resolve(res);
                }).catch(function(err) {
                    console.log("********** Insertion References Erreurs **********")
                    return reject(err);
                })
            })
        })
    })
}

var researchFormatId = function(formatLabel) {
    // recherche l'id format selon le libellé du format passé en paramètres
    return new Promise(function(resolve, reject) {
        Format.find({
                attributes: ["id"],
                where: {
                    label: formatLabel
                }
            }).then(function(res) {
                return resolve(res.id);
            })
            .catch(function(err) {
                console.log("********** research Format Erreur **********")
                return reject(err);
            });
    })
}

var researchReferenceTypeId = function(referenceTypeLabel) {
    // recherche l'id referenceType selon le libellé du format passé en paramètres
    return new Promise(function(resolve, reject) {
        ReferenceType.find({
                attributes: ["id"],
                where: {
                    label: referenceTypeLabel
                }
            }).then(function(res) {
                return resolve(res.id);
            })
            .catch(function(err) {
                console.log("********** research Reference Erreur **********")
                return reject(err);
            });
    });
}

var initDistributors = function(json) {
    console.log("********** Insertion Distributors Début **********")
    //    insertion des distributors
    return new Promise(function(resolve, reject) {
        var tabDistributors = [];
        var distributors = (_.uniq(_.pluck(json.communes, 'distributor')))
        for (distributor of distributors) {
            tabDistributors.push(
                Distributor.create({
                    label: distributor
                })
            );
        }
        Promise.all(tabDistributors).then(function(res) {
            console.log("********** Insertion Distributors Fin **********")
            return resolve(res);
        }).catch(function(err) {
            console.log("********** Insertion Distributors Erreur **********")
            return reject(err);
        })
    })
}

var initDistricts = function(json, orderId) {
    console.log("********** Insertion Districts Début **********")
    //    insertion des districts
    return new Promise(function(resolve, reject) {
        var tabDistricts = [];
        var districts = (_.uniq(_.pluck(json.communes, 'leadDistributor')))
        for (district of districts) {
            tabDistricts.push(
                District.create({
                    label: district,
                    OrderId: orderId
                })
            )
        }
        Promise.all(tabDistricts).then(function(res) {
            console.log("********** Insertion Districts Fin **********")
            return resolve(res);
        }).catch(function(err) {
            console.log("********** Insertion Districts Erreur **********")
            return reject(err);
        })
    })
}

var researchDistrictId = function(districtLabel) {
    // recherche l'id district selon le libellé du district passé en paramètres
    return new Promise(function(resolve, reject) {
        District.find({
                attributes: ["id"],
                where: {
                    label: districtLabel
                }
            }).then(function(res) {
                return resolve(res.id);
            })
            .catch(function(err) {
                console.log("********** research District Erreur **********")
                return reject(err);
            });
    });
}

var researchDistributorId = function(distributorLabel) {
    // recherche l'id distributor selon le libellé du distributor passé en paramètres
    return new Promise(function(resolve, reject) {
        Distributor.find({
                attributes: ["id"],
                where: {
                    label: distributorLabel
                }
            }).then(function(res) {
                return resolve(res.id);
            })
            .catch(function(err) {
                console.log("********** research Distributor Erreur **********")
                return reject(err);
            });
    });
}

var initCities = function(json) {
    return new Promise(function(resolve, reject) {
        console.log("********** Insertion Cities Début **********")
        // insertion des  cities
        var tabCities = [];
        var tabDistributors = [];
        var tabDistricts = [];

        for (city of json.communes) {
            tabDistributors.push(researchDistributorId(city.distributor));
            tabDistricts.push(researchDistrictId(city.leadDistributor));
        }
        Promise.all(tabDistributors).then(function(resDistributors) {
            Promise.all(tabDistricts).then(function(resDistricts) {
                for (var i = 0; i < json.communes.length; i++) {
                    tabCities.push(
                        City.create({
                            inseeCode: json.communes[i].inseeCode,
                            cantonCode: json.communes[i].cantonCode,
                            city: json.communes[i].city,
                            arrondissement: json.communes[i].arrondissement,
                            email: json.communes[i].email,
                            address: json.communes[i].address,
                            postCode: json.communes[i].postCode,
                            contact: json.communes[i].contact,
                            phone: json.communes[i].phone,
                            openingHours: json.communes[i].openingHours,
                            elector: json.communes[i].elector,
                            quantity: json.communes[i].quantity,
                            DistributorId: resDistributors[i],
                            DistrictId: resDistricts[i]
                        })
                    )
                }
            }).then(function() {
                Promise.all(tabCities).then(function(res) {
                    console.log("********** Insertion Cities Fin **********")
                    return resolve(res);
                }).catch(function(err) {
                    console.log("********** Insertion Cities Erreurs **********")
                    return reject(err);
                })
            })
        })
    })
}

var researchCityId = function(CityInsee) {
    // recherche l'id City selon le code insee de city passé en paramètres
    return new Promise(function(resolve, reject) {
        City.find({
                attributes: ["id"],
                where: {
                    inseeCode: CityInsee
                }
            }).then(function(res) {
                return resolve(res.id);
            })
            .catch(function(err) {
                console.log("********** research City Erreur **********")
                return reject(err);
            });
    });
}

var initCityReferences = function(json) {
    return new Promise(function(resolve, reject) {
        console.log("********** Insertion CityReferences Début **********")
        // insertion des  cityReferences
        var tabCityReferences = [];
        var tabCities = [];

        for (cityReference of json.insertion) {
            tabCities.push(researchCityId(cityReference.inseeCode));
        }
        Promise.all(tabCities).then(function(resCities) {
            for (var i = 0; i < json.insertion.length; i++) {
                tabCityReferences.push(
                    CityReference.create({
                        insertion: json.insertion[i].insertion,
                        ReferenceId: json.insertion[i].referenceId,
                        CityId: resCities[i]
                    })
                )
            }
        }).then(function() {
            Promise.all(tabCityReferences).then(function(res) {
                console.log("********** Insertion CityReferences Fin **********")
                return resolve(res);
            }).catch(function(err) {
                console.log("********** Insertion CityReferences Erreurs **********")
                return reject(err);
            })
        })
    })
}
