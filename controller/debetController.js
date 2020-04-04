const debetModel = require('../model/debetModel')

const info = (req, res) => {
    debetModel.info(req, res)
}

const total = (req, res) => {
    debetModel.total(req, res)
}

const add = (req, res) => {
    debetModel.add(req, res)
}

const deleteInfo = (req, res) => {
    debetModel.deleteInfo(req, res)
}

module.exports = {
    info,
    total,
    add,
    deleteInfo
}