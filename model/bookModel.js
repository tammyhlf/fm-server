const uuidv1 = require('uuid/v1');
const connection = require('../api/database/db');

const book = (req, res) => {
  const userId = req.body.userId;
  const kinds = req.body.kinds;
  const type = req.body.type;
  const price = req.body.price;
  const remark = req.body.remark || '';
  const billId = uuidv1();

  let sql = `INSERT INTO bills(user_id, bills_id, kinds, type, price, remark)
    VALUES
    ('${userId}', '${billId}', '${kinds}', '${type}', '${price}', '${remark}')`

  connection.query(sql, (errs) => {
    if (errs) {
      throw errs;
    } else {
      res.send({ code: 0, msg: '记账成功!' })
    }
  });
}

const bookInfo = (req, res) => {
  const userId = req.query.userId;
  const time = req.query.time || '';
  let infoSql, paySql;
  if(time) {
    infoSql = `SELECT * FROM bills where user_id = '${userId}' and date like '${time}%'`;
    paySql = `SELECT type as name, sum(price) as value FROM bills where user_id = '${userId}' and 
    kinds = '支出' and date like '${time}%' group by type`
    incomeSql = `SELECT type as name, sum(price) as value FROM bills where user_id = '${userId}' and 
    kinds = '收入' and date like '${time}%' group by type`
  } else {
    infoSql = `SELECT * FROM bills where user_id = '${userId}'`;
    paySql = `SELECT type as name, sum(price) as value FROM bills where user_id = '${userId}' and 
    kinds = '支出' group by type`
    incomeSql = `SELECT type as name, sum(price) as value FROM bills where user_id = '${userId}' and 
    kinds = '收入' group by type`
  }
  const info = new Promise((resolve, reject) => {
    connection.query(infoSql, (err, result) => {
      if (err) {
        reject({ msg: '数据查询失败', err: err, result })
      } else {
        resolve(result);
      }
    })
  })
  const pay = new Promise((resolve, reject) => {
    connection.query(paySql, (err, result) => {
      if (err) {
        reject({ msg: '数据查询失败', err: err, result })
      } else {
        resolve(result);
      }
    })
  })
  const income = new Promise((resolve, reject) => {
    connection.query(incomeSql, (err, result) => {
      if (err) {
        reject({ msg: '数据查询失败', err: err, result })
      } else {
        resolve(result);
      }
    })
  })

  Promise.all([info, pay, income]).then(result => {
    res.send({ code: 0, data: result })
  }).catch(err => {
    res.send({ code: 5001, msg: err })
  })
}

const deleteInfo = (req, res) => {
  const billsId = req.body.billsId;
  const deleteSql = `Delete FROM bills where bills_id = '${billsId}'`;
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
  book,
  bookInfo,
  deleteInfo
}