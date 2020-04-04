const connection = require('../api/database/db');

const add = (req, res) => {
  const userId = req.body.userId;
  const type = req.body.type;
  const price = req.body.price;
  const name = req.body.name || '';
  const month = req.body.month || '';
  let sql;
  if(type === 'ant') {
    sql = `INSERT INTO ant(user_id, price) VALUES ('${userId}', '${price}')`
  } else if (type === 'card') {
    sql = `INSERT INTO card(user_id, price, name, month) VALUES ('${userId}', '${price}', '${name}', '${month}')`
  } else {
    sql = `INSERT INTO debet(user_id, price, name) VALUES ('${userId}', '${price}', '${name}')`
  }
   
  connection.query(sql, (errs) => {
    if (errs) {
      throw errs;
    } else {
      res.send({ code: 0, msg: '记录成功!' })
    }
  });
}

const total = (req, res) => {
  const userId = req.query.id;
  let infoSql = `SELECT sum(price) as ant FROM ant where user_id = '${userId}'
    union
    SELECT sum(price) FROM card where user_id = '${userId}'
    union
    SELECT sum(price) FROM debet where user_id = '${userId}'`;

  new Promise((resolve, reject) => {
    connection.query(infoSql, (err, result) => {
      if (err) {
        reject({ msg: '数据查询失败', err: err, result })
      } else {
        resolve({ msg: '查询成功', result });
      }
    })
  }).then(data => {
    const datas = data.result;
    res.send({ code: 0, data: datas })
  }).catch((err) => {
    res.send({ code: 5001, msg: err })
  })
}

const info = (req, res) => {
  const userId = req.query.id;
  const type = req.query.type;
  let infoSql;
  if(type == 'ant') {
    infoSql = `SELECT sum(price) as ant FROM ${type} where user_id = '${userId}'`;
  } else {
    infoSql = `SELECT * FROM ${type} where user_id = '${userId}'`;
  }

  new Promise((resolve, reject) => {
    connection.query(infoSql, (err, result) => {
      if (err) {
        reject({ msg: '数据查询失败', err: err, result })
      } else {
        resolve({ msg: '查询成功', result });
      }
    })
  }).then(data => {
    const datas = data.result;
    res.send({ code: 0, data: datas })
  }).catch((err) => {
    res.send({ code: 5001, msg: err })
  })
}

const deleteInfo = (req, res) => {
  const id = req.body.id;
  const type = req.body.type;
  const deleteSql = `Delete FROM ${type} where id = '${id}'`;
  new Promise((resolve, reject) => {
    connection.query(deleteSql, (err, result) => {
      if (err) {
        reject({ msg: '数据查询失败', err: err, result })
      } else {
        resolve({ msg: '查询成功', result });
      }
    })
  }).then(datas => {
    res.send({ code: 0, msg: "删除成功！" })
  }).catch((err) => {
    res.send({ code: 5001, msg: err })
  })
}

module.exports = {
  info,
  total,
  add,
  deleteInfo
}