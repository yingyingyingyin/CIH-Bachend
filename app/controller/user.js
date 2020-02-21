'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    const payload = ctx.request.body;
    try {
      const token = await ctx.service.userAccess.login(payload);
      if (payload.role !== '2') {
        const msg = await ctx.service.info.getRemindMsg(payload.userId, payload.role);
        const realName = await ctx.service.user.getUserRealName(payload.userId);
        if (msg === '') {
          ctx.helper.success(ctx, { token, remind: false, msg, realName }, null);
        } else {
          ctx.helper.success(ctx, { token, remind: true, msg, realName }, null);
        }
      } else {
        ctx.helper.success(ctx, { token, remind: false, msg: null, realName: '管理员' }, null);
      }

    } catch (err) {
      ctx.helper.fail(ctx, null, err.message);
    }
  }

  async logout() {
    const { ctx } = this;
    try {
      // await ctx.service.userAccess.logout();
      ctx.helper.success(ctx, null, '您已成功退出账户！');
    } catch (err) {
      ctx.helper.fail(ctx, null, err.message);
    }
  }

  async info() {
    const { ctx } = this;
    try {
      const role = ctx.service.userAccess.getRole();
      const userId = ctx.service.userAccess.getUserId();
      const user = await ctx.service.user.findByUserId(userId, role);
      ctx.helper.success(ctx, user, null);
    } catch (err) {
      ctx.helper.fail(ctx, null, '查询失败，请重试！');
    }
  }

  async update() {
    const { ctx } = this;
    const row = ctx.request.body;
    const userId = ctx.service.userAccess.getUserId();
    const role = ctx.service.userAccess.getRole();
    try {
      const success = await ctx.service.user.updateUserInfo(userId, role, row);
      if (success) {
        ctx.helper.success(ctx, null, null);
      }
    } catch (err) {
      ctx.helper.fail(ctx, null, '修改失败，请重试！');
    }
  }

  async reset() {
    const { ctx } = this;
    const originPassword = ctx.request.body.oldPassword;
    const newPassword = ctx.request.body.newPassword;
    const hashNewPassword = await ctx.service.userAccess.generateHash(newPassword);
    const userId = ctx.service.userAccess.getUserId();
    const role = ctx.service.userAccess.getRole();

    const { user } = await ctx.service.user.findByUserId(userId, role);
    switch (role) {
      case '0':
        const correct1 = await ctx.compare(originPassword, user.s_password);
        if (!correct1) {
          ctx.helper.fail(ctx, null, '原密码错误！');
          return;
        }
        break;
      case '1':
        const correct2 = await ctx.compare(originPassword, user.t_password);
        if (!correct2) {
          ctx.helper.fail(ctx, null, '原密码错误！');
          return;
        }
        break;
      default:
        ctx.helper.fail(ctx, null, '错误的角色类型！');
        return;
    }
    try {
      const success = await ctx.service.user.updateUserPassword(userId, role, hashNewPassword);
      if (success) {
        ctx.helper.success(ctx, null, null);
      }
    } catch (err) {
      ctx.helper.fail(ctx, null, '修改失败');
    }
  }

  async teacherAll() {
    const { ctx } = this;
    const teacherInfos = await this.service.user.getTeacherInfoAll();
    if (teacherInfos) {
      ctx.helper.success(ctx, { teacherInfos }, null);
    } else {
      ctx.helper.fail(ctx, null, '导师信息获取失败！');
    }
  }

  async messageGet() {
    const { ctx } = this;
    const userId = await ctx.service.userAccess.getUserId();
    const role = await ctx.service.userAccess.getRole();
    switch (role) {
      case '1':
        let inviteMsgs0 = await ctx.service.message.getInviteMsg(userId);
        ctx.helper.success(ctx, { inviteMsgs0 }, null);
        return;
      case '0':
        let inviteMsg1 = await ctx.service.message.getInviteMsg(userId);
        let applyMsgs = await ctx.service.message.getApplyMsg(userId);
        ctx.helper.success(ctx, { inviteMsg1, applyMsgs }, null);
        return;
      default:
        ctx.helper.fail(ctx, null, '错误的角色类型！');
    }
  }

  async messageAgree() {
    const { ctx } = this;
    const teamId = ctx.request.body.teamId;
    const msgId = ctx.request.body.msgId;
    const userId = ctx.service.userAccess.getUserId();
    // 设置消息状态
    const result = await ctx.service.message.setMsgState(msgId);
    // 更新join_or_guide_table
    const ok = await ctx.service.team.teamAndPerson(teamId, userId);
    if (result && ok) {
      ctx.helper.success(ctx, null, null);
    } else {
      ctx.helper.fail(ctx, null, '操作失败！');
    }
  }

  async messageAgreeApply() {
    const { ctx } = this;
    const teamId = ctx.request.body.teamId;
    const msgId = ctx.request.body.msgId;
    const userId = ctx.request.body.userId;
    // 设置消息状态
    const result = await ctx.service.message.setMsgState(msgId);
    // 更新join_or_guide_table
    const ok = await ctx.service.team.teamAndPerson(teamId, userId);
    if (result && ok) {
      ctx.helper.success(ctx, null, null);
    } else {
      ctx.helper.fail(ctx, null, '操作失败！');
    }
  }

  async messageSend() {
    const { ctx } = this;
    const userId = ctx.service.userAccess.getUserId();
    const { inviteMsgsTeacher, inviteMsgs, applyMsgs } = await ctx.service.message.getSendMsg(userId);
    for (let i = 0; i < inviteMsgsTeacher.length; i++) {
      inviteMsgsTeacher[i].s_name = inviteMsgsTeacher[i].t_name;
      inviteMsgsTeacher[i].s_email = inviteMsgsTeacher[i].t_email;
      delete inviteMsgsTeacher[i].t_name;
      delete inviteMsgsTeacher[i].t_email;
      inviteMsgs.push(inviteMsgsTeacher[i]);
    }
    if (inviteMsgs || applyMsgs) {
      ctx.helper.success(ctx, { inviteMsgs, applyMsgs }, null);
    } else {
      ctx.helper.fail(ctx, null, '暂无已发送消息');
    }

  }

  async messageRead() {
    const { ctx } = this;
    const msgId = ctx.request.body.msgId;
    const ok = await ctx.service.message.setMsgRead(msgId);
    if (ok) {
      ctx.helper.success(ctx, null, null);
    } else {
      ctx.helper.fail(ctx, null, '消息状态设置失败！');
    }
  }

  async messageDel() {
    const { ctx } = this;
    const msgId = ctx.request.body.msgId;
    const ok = await ctx.service.message.deleteMsgById(msgId);
    if (ok) {
      ctx.helper.success(ctx, null, null);
    } else {
      ctx.helper.fail(ctx, null, '消息删除失败！');
    }
  }

  async getRole() {
    const { ctx } = this;
    const role = ctx.service.userAccess.getRole();
    if (!role) {
      ctx.helper.fail(ctx, null, '请求出错');
    } else {
      ctx.helper.success(ctx, { role: role }, null);
    }
  }

}

module.exports = UserController;
