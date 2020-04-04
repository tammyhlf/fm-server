const connection = require('../api/database/db');
const uuidv1 = require('uuid/v1');

const save = (req, res) => {
  const userId = req.body.userId;
  const content = req.body.content;
  const goal = req.body.goal;
  const plan = req.body.plan;
  const starId = uuidv1();

  let sql = `INSERT INTO star( star_id, content, goal, plan, user_id)
    VALUES
    ('${starId}', '${content}', '${goal}', '${plan}', '${userId}')`

  connection.query(sql, (errs) => {
    if (errs) {
      throw errs;
    } else {
      res.send({ code: 0, msg: '成功！' })
    }
  });
}

const star = (req, res) => {
  const userId = req.query.userId;
  const infoSql = `SELECT goal, plan, content FROM star where user_id = '${userId}'`;
  new Promise((resolve, reject) => {
    connection.query(infoSql, (err, result) => {
      if (err) {
        reject({ msg: '数据查询失败', err: err, result })
      } else {
        resolve({ msg: '查询成功', result });
      }
    })
  }).then(data => {
    const datas = data.result[0];
    res.send({ code: 0, data: datas || null })
  }).catch((err) => {
    res.send({ code: 5001, msg: err })
  })
}

const update = (req, res) => {
  const userId = req.body.userId;
  const content = req.body.content;
  const goal = req.body.goal;
  const plan = req.body.plan;
  const infoSql = `update star set content = '${content}', goal = '${goal}', plan = '${plan}'
    where user_id = '${userId}'`;
  new Promise((resolve, reject) => {
    connection.query(infoSql, (err, result) => {
      if (err) {
        reject({ msg: '数据查询失败', err: err, result })
      } else {
        resolve({ msg: '查询成功', result });
      }
    })
  }).then(data => {
    const datas = data.result[0];
    res.send({ code: 0, data: datas || null })
  }).catch((err) => {
    res.send({ code: 5001, msg: err })
  })
}

module.exports = {
    save,
    star,
    update
}