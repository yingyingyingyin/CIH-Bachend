'use strice';

const jwt = require('jsonwebtoken');

module.exports = (options, app) => {
  return async function userInterceptor(ctx, next) {
    let authToken = ctx.header.authorization;
    if (authToken) {
      authToken = authToken.substring(7);
      try {
        const { data } = jwt.verify(authToken, app.config.jwtM.secret);
        // 单点登录逻辑
        // const redis_token = await app.redis.get(data.userId + data.role);
        // if (redis_token) {
        if (true) {
          await next();
        } else {
          ctx.body = { success: false, data: null, msg: '您的状态错误，请重新登录！' };
        }
      } catch (err) {
        ctx.body = { success: false, data: null, msg: 'token验证出错: ' + err.message };
      }
    } else {
      ctx.body = { success: false, data: null, msg: '您没有操作权限，请登陆后再进行操作！' };
    }
  };
};
