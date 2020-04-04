const connection = require('../api/database/db');

const overview = (req, res) => {
  const userId = req.query.userId;
  const overviewSql = `SELECT sum(price) as yesPay FROM bills where user_id = '${userId}' and 
  kinds = '支出' and to_days(date) = to_days(now())`;
  const paySql = `SELECT sum(price) as pay FROM bills where user_id = '${userId}' and 
  kinds = '支出' and DATE_FORMAT(date, '%Y%m' ) = DATE_FORMAT( CURDATE() ,'%Y%m' )`;
  const incomeSql = `SELECT sum(price) as income FROM bills where user_id = '${userId}' and 
  kinds = '收入' and DATE_FORMAT(date, '%Y%m' ) = DATE_FORMAT( CURDATE() ,'%Y%m' )`;

  const overviews = new Promise((resolve, reject) => {
    connection.query(overviewSql, (err, result) => {
      if (err) {
        reject({ msg: '数据查询失败', err: err, result })
      } else {
        resolve(result[0]);
      }
    })
  })
  const pay = new Promise((resolve, reject) => {
    connection.query(paySql, (err, result) => {
      if (err) {
        reject({ msg: '数据查询失败', err: err, result })
      } else {
        resolve(result[0]);
      }
    })
  })
  const income = new Promise((resolve, reject) => {
    connection.query(incomeSql, (err, result) => {
      if (err) {
        reject({ msg: '数据查询失败', err: err, result })
      } else {
        resolve(result[0]);
      }
    })
  })

  Promise.all([overviews, pay, income]).then(result => {
    res.send({ code: 0, data: result })
  }).catch(err => {
    console.log(err)
  })
}

module.exports = {
  overview
}