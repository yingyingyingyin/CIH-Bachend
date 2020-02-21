'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async findByUserId(userId, role) {
    let user;
    switch (role) {
      case '0':
        user = await this.app.mysql.get('student_info_table', {
          s_id: userId,
        });
        break;
      case '1':
        user = await this.app.mysql.get('teacher_info_table', {
          t_id: userId,
        });
        break;
      case '2':
        user = await this.app.mysql.get('root_info_table', {
          root_id: userId,
        });
        break;
      default:
        throw new Error('角色类型不存在');
    }
    if (!user) {
      throw new Error('不存在此用户');
    }
    return {
      user,
    };
  }

  async getUserRealName(userId) {
    try {
      const user = await this.app.mysql.get('student_school_info', {
        user_id: userId,
      });
      return user.user_real_name;
    } catch (err) {
      throw new Error('没有此用户！');
    }
  }

  async updateUserInfo(userId, role, row) {
    let result;
    switch (role) {
      case '0':
        result = await this.app.mysql.update('student_info_table', row, {
          where: {
            s_id: userId,
          },
        });
        break;
      case '1':
        result = await this.app.mysql.update('teacher_info_table', row, {
          where: {
            t_id: userId,
          },
        });
        break;
      default:
        throw new Error('错误的角色类型！');
    }
    if (result.affectedRows === 1) {
      return true;
    }
    return false;
  }

  async updateUserPassword(userId, role, password) {
    let result;
    switch (role) {
      case '0':
        result = await this.app.mysql.update('student_info_table', {s_password: password}, {
          where: {
            s_id: userId,
          },
        });
        break;
      case '1':
        result = await this.app.mysql.update('teacher_info_table', {t_password: password}, {
          where: {
            t_id: userId,
          },
        });
        break;
      default:
        throw new Error('错误的角色类型！');
    }
    if (result.affectedRows === 1) {
      return true;
    }
    return false;
  }

  async getTeacherInfoAll() {
    const teacherInfos = await this.app.mysql.query(
      'SELECT t_id, t_name, t_phonenumber, t_email, t_profession, t_profession_direction, t_introduction FROM teacher_info_table WHERE t_phonenumber IS NOT NULL AND t_introduction IS NOT NULL AND t_profession IS NOT NULL AND t_profession_direction IS NOT NULL');
      if (teacherInfos) {
        return teacherInfos;
      } else {
        return false;
      }
  }
}

module.exports = UserService;
