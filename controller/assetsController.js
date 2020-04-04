const assetsModel = require('../model/assetsModel')

const info = (req, res) => {
    assetsModel.info(req, res)
}

const total = (req, res) => {
    assetsModel.total(req, res)
}

const add = (req, res) => {
    assetsModel.add(req, res)
}

const deleteInfo = (req, res) => {
    assetsModel.deleteInfo(req, res)
}

module.exports = {
    info,
    total,
    add,
    deleteInfo
}