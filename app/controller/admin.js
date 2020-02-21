'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async add() {
    const { ctx } = this;
    const payload = ctx.request.body;
    try {
      const role = ctx.service.userAccess.getRole();
      if (role !== '2') {
        throw new Error('您不是管理员，没有操作权限！');
      }
      await ctx.service.admin.addUser(payload);
      ctx.helper.success(ctx, null, '添加成功!');
    } catch (err) {
      ctx.helper.fail(ctx, null, '添加失败：' + err.message);
    }
  }

  // 暂时功能只满足 更改  student_school_info、student_info_table、teacher_info_table 表
  async del() {
    const { ctx } = this;
    const payload = ctx.request.body;
    try {
      await ctx.service.admin.delUser(payload);
      ctx.helper.success(ctx, null, '删除成功！');
    } catch (err) {
      ctx.helper.fail(ctx, null, '操作失败：' + err.message);
    }
  }

  async all() {
    const { ctx } = this;
    try {
      const { allUsers } = await ctx.service.admin.getAllUsers();
      ctx.helper.success(ctx, { allUsers }, null);
    } catch (err) {
      ctx.helper.fail(ctx, null, '获取信息出错：' + err.message);
    }
  }
}
module.exports = AdminController;
