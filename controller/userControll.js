const userModel = require('../model/userModel')

const signin = (req, res) => {
  userModel.signin(req, res)
}

const signup = (req, res) => {
  userModel.signup(req, res)
}

const checkLogin = (req, res) => {
  userModel.checkLogin(req, res)
}

const info = (req, res) => {
  userModel.info(req, res)
}

module.exports = {
  signin,
  signup,
  info,
  checkLogin
}