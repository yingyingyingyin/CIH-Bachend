'use strict';

const Service = require('egg').Service;

class AdminService extends Service {
  async addUser(payload) {
    // 构造用户默密码
    const originPasswd = payload.userId + '@123';
    const password = await this.service.userAccess.generateHash(originPasswd);
    // 开启数据库事务
    switch (payload.role) {
      case '0': await this.app.mysql.beginTransactionScope(
        async conn => {
          await conn.insert('student_school_info',
            {
              user_id: payload.userId,
              user_real_name: payload.realName,
              user_role: payload.role,
            });
          await conn.insert('student_info_table',
            {
              s_id: payload.userId,
              s_name: payload.realName,
              s_password: password,
              s_gender: '未知',
            });
        }
        , this.ctx); break;
      case '1': await this.app.mysql.beginTransactionScope(
        async conn => {
          await conn.insert('student_school_info',
            {
              user_id: payload.userId,
              user_real_name: payload.realName,
              user_role: payload.role,
            });
          await conn.insert('teacher_info_table',
            {
              t_id: payload.userId,
              t_name: payload.realName,
              t_password: password,
              t_gender: '未知',
            });
        }
        , this.ctx); break;
      default: throw new Error('不允许的用户的角色！');
    }
  }

  async getAllUsers() {
    const allUsers = await this.app.mysql.select('student_school_info',
      {
        columns: [ 'user_id', 'user_real_name', 'user_role' ],
      });
    return { allUsers };
  }

  async delUser(payload) {
    switch (payload.role) {
      case '0': await this.app.mysql.beginTransactionScope(
        async conn => {
          const user = await conn.get('student_school_info', { user_id: payload.userId });
          if (!user) {
            throw new Error('不存在此用户！');
          }
          await conn.delete('student_info_table',
          {
            s_id: payload.userId,
          });
          await conn.delete('student_school_info',
            {
              user_id: payload.userId,
            });
        }
        , this.ctx); break;
      case '1': await this.app.mysql.beginTransactionScope(
        async conn => {
          const user = await conn.get('student_school_info', { user_id: payload.userId });
          if (!user) {
            throw new Error('不存在此用户！');
          }
          await conn.delete('teacher_info_table',
          {
            t_id: payload.userId,
          });
          await conn.delete('student_school_info',
            {
              user_id: payload.userId,
            });
        }
        , this.ctx); break;
      default: throw new Error('不允许的用户的角色！');
    }
  }
}


module.exports = AdminService;
