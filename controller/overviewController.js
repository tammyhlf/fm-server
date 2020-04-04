const overviewModel = require('../model/overviewModel')

const overview = (req, res) => {
    overviewModel.overview(req, res)
}

module.exports = {
    overview
}