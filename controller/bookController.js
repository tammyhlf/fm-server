const bookModel = require('../model/bookModel')

const book = (req, res) => {
    bookModel.book(req, res)
}

const bookInfo = (req, res) => {
    bookModel.bookInfo(req, res)
}

const deleteInfo = (req, res) => {
    bookModel.deleteInfo(req, res)
}

module.exports = {
    book,
    bookInfo,
    deleteInfo
}