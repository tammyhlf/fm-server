const starModel = require('../model/starModel')

const saveStar = (req, res) => {
    starModel.save(req, res)
}

const getStar = (req, res) => {
    starModel.star(req, res)
}

const updateStar = (req, res) => {
    starModel.star(req, res)
}

module.exports = {
    saveStar,
    getStar,
    updateStar
}