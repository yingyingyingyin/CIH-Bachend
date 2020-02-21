'use strict';

const jwt = require('jsonwebtoken');

module.exports = {
  /**
   * 请求成功后的返回数据格式
   */
  success(ctx, data, msg) {
    ctx.body = {
      success: true,
      data,
      msg,
    };
  },
  /**
     * 请求失败时的返回数据格式
     */
  fail(ctx, data, msg) {
    ctx.body = {
      success: false,
      data,
      msg,
    };
  },
  /**
     * token生成
     */
  loginToken(data, expires = 7200, secret) {
    const exp = Math.floor(Date.now() / 1000) + expires;
    const token = jwt.sign({ data, exp }, secret);
    return token;
  },
  /**
     * 解析token中的userId
     */
  getUserIdByToken(token, secret) {
    const tokenOrigin = jwt.verify(token, secret);
    return tokenOrigin;
  },

  /**
   * 判断token能否成功解析
   */
  isValidToken(token, secret) {
    try {
      const tokenOrigin = jwt.verify(token, secret);
    } catch (err) {
      return false;
    }
    return true;
  },
};
