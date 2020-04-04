const connection = require('../api/database/db');
const uuidv1 = require('uuid/v1');
const jwt = require("jsonwebtoken")
const crypto = require('crypto');

const signin = (req, res) => {
  const phone = req.body.phone;
  const password = req.body.password;
  let sql = `SELECT * FROM user where phone = '${phone}'`;
  new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject({ msg: '数据查询失败', err: err, result });
      } else {
        resolve({ msg: '查询成功', result });
      }
    });
  })
    .then(data => {
      // var random = data.result[0].csprng;  // 暂时不加入随机数啦
      if (data.result.length) {
        var dbpassword = data.result[0];
        if (password === dbpassword.password) {
          const authToken = jwt.sign({
            phone,
            password
          }, "secret", {
              expiresIn: 1 * 24 * 60 * 60
            })
          // const token = crypto.createHash('sha256').update(`${ authToken }`).digest('hex')
          res.send({ msg: '登录成功！', code: 0, data: { id: data.result[0].user_id, token: authToken } });
        }
      } else {
        res.send({ msg: '帐号或者密码错误', code: 500 });
      }

    })
    .catch(error => {
      res.send({ msg: '该账户不存在！', code: 5001 });
    })
}

const signup = (req, res) => {
  const username = req.body.username;
  const phone = req.body.phone;
  const password = req.body.password;
  let findSql = `SELECT * FROM user where phone = '${phone}'`;
  new Promise((resolve, reject) => {
    connection.query(findSql, (err, result) => {
      if (err) {
        reject({ msg: '数据查询失败', err: err, result });
      } else {
        resolve({ msg: '查询成功', result });
      }
    });
  })
    .then(data => {
      if (data.result.length) {
        res.send({ msg: '账户已经存在！', code: 5002 });
      } else {
        let sql = `INSERT INTO user(user_id, username, phone, password)
        VALUES
        ('${uuidv1()}', '${username}', '${phone}', '${password}')`
        connection.query(sql, (errs) => {
          if (errs) {
            throw errs;
          } else {
            res.send({ msg: '注册成功，请登录！', code: 0 });
          }
        });
      }
    })
    .catch(() => {
      res.send({ msg: '注册错误！', code: 5001 });
    })
}

const info = (req, res) => {
  const userId = req.query.userId;
  const infoSql = `SELECT * FROM user where user_id = '${userId}'`;
  new Promise((resolve, reject) => {
    connection.query(infoSql, (err, result) => {
      if (err) {
        reject({ msg: '数据查询失败', err: err, result });
      } else {
        resolve({ msg: '查询成功', result });
      }
    });
  })
    .then(data => {
      res.send({ code: 0, data: { name: data.result[0].username, avatar: data.result[0].avatar || null } })
    })
    .catch(() => {
      res.send({ msg: '错误', code: 5001 });
    })
}

module.exports = {
  signin,
  signup,
  info,
}