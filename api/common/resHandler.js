/**
 * 响应处理
 * @param {response} response 传入响应
 * @author zjy 2019.4.29
 */
const resHandler = (request, response) => { 
  //设置头部
  response.set({
    'Access-Control-Allow-Origin':  request.header('Origin'),
    'Access-Control-Allow-Credentials':  'true',
    'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, token',
    'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS',
    'Content-Type': 'text/plain; charset=utf-8',
  });
};

module.exports = resHandler;