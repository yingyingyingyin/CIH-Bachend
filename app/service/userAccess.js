'use strict';

const Service = require('egg').Service;

class UserAccessService extends Service {
  async login(payload) {
    const { ctx, service, app } = this;
    const { user } = await service.user.findByUserId(payload.userId, payload.role);
    if (!user) {
      throw new Error('没有此用户');
    }
    let verifyResult;
    switch (payload.role) {
      case '0': verifyResult = await ctx.compare(payload.password, user.s_password);
        break;
      case '1': verifyResult = await ctx.compare(payload.password, user.t_password);
        break;
      case '2': verifyResult = await ctx.compare(payload.password, user.root_password);
        break;
      default: throw new Error('角色类型不存在');
    }
    if (!verifyResult) {
      throw new Error('密码错误！');
    }
    const redis_token = await app.redis.get(payload.userId + payload.role);
    // 检测此token有没有过期
    if (!ctx.helper.isValidToken(redis_token, app.config.jwtM.secret)) {
      await app.redis.del(payload.userId + payload.role);
    }
    if (redis_token) {
      throw new Error('账户已经在其他地方登录!为了开发方便，在此错误消息中显示已登录用户token，你可以使用此token，去logout接口将此用户注销再登录 ' + redis_token);
    }
    const token = ctx.helper.loginToken({ userId: payload.userId, role: payload.role }, 60 * 60 * 24, app.config.jwtM.secret);
    // await app.redis.set(payload.userId + payload.role, token);
    return token;
  }

  async logout() {
    const { ctx, app } = this;
    const tokenFromHeader = ctx.header.authorization.substring(7);
    const { data } = ctx.helper.getUserIdByToken(tokenFromHeader, app.config.jwtM.secret);
    const oldToken = await app.redis.get(data.userId + data.role);
    if (oldToken && oldToken === tokenFromHeader) {
      await this.app.redis.del(data.userId + data.role);
    } else {
      throw new Error('身份信息失效！');
    }
  }

  // 获取用户角色
  getRole() {
    const { ctx, app } = this;
    const tokenFromHeader = ctx.header.authorization.substring(7);
    const { data } = ctx.helper.getUserIdByToken(tokenFromHeader, app.config.jwtM.secret);
    return data.role;
  }

  getUserId() {
    const { ctx, app } = this;
    const tokenFromHeader = ctx.header.authorization.substring(7);
    const { data } = ctx.helper.getUserIdByToken(tokenFromHeader, app.config.jwtM.secret);
    return data.userId;
  }

  // 获取密码加密后的字符串
  async generateHash(plainText) {
    const hash = await this.ctx.genHash(plainText);
    return hash;
  }
}

module.exports = UserAccessService;
