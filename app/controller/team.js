'use strict';

const Controller = require('egg').Controller;

class TeamController extends Controller {
  async all() {
    const { ctx } = this;
    const mId = ctx.request.body.mId;
    try {
      const { teams } = await ctx.service.team.all(mId);
      for (let i = 0; i < teams.length; i++) {
        teams[i].index = i + 1;
      }
      ctx.helper.success(ctx, teams, null);
    } catch (err) {
      ctx.helper.fail(ctx, null, err.message);
    }
  }

  async userall() {
    const { ctx } = this;
    const userId = ctx.service.userAccess.getUserId();
    try {
      // 获取所有队伍
      const { teams } = await ctx.service.team.getAllTeamsByUserId(userId);
      for (let i = 0; i < teams.length; i++) {

        // 获取成员姓名
        const { members } = await ctx.service.team.getMember(teams[i].team_id, teams[i].team_leader_id);
        teams[i].member = '';

        for (let j = 0; j < members.length; j++) {
          teams[i].member += members[j].s_name + " ";
        }

        // 获取导师姓名
        const { teachers } = await ctx.service.team.getTeacher(teams[i].team_id);
        teams[i].teacher = '';
        for (let j = 0; j < teachers.length; j++) {
          teams[i].teacher += teachers[j].t_name + " ";
        }

        // 获取队长电话号码
        const { user } = await ctx.service.user.findByUserId(teams[i].team_leader_id, '0');
        teams[i].leaderPhone = user.s_phonenumber;
        teams[i].leaderName = user.s_name;
        teams[i].index = i + 1;

        // 删除多余字段
        delete teams[i].person_id;
        delete teams[i].team_leader_id;
        delete teams[i].team_join_id;
      }
      ctx.helper.success(ctx, teams, null);
    } catch (err) {
      ctx.helper.fail(ctx, null, err.message);
    }
  }


  async add() {
    const { ctx } = this;
    let row = {};
    row.team_leader_id = ctx.service.userAccess.getUserId();
    row.team_join_id = ctx.request.body.mId;
    const { detailMatch } = await ctx.service.match.detail(row.team_join_id);
    row.team_name = detailMatch.m_name + '小队';
    row.team_max_person_number = detailMatch.m_max_person;
    row.team_current_person_number = 1;
    try {
      const ok = await ctx.service.team.createNewTeam(row);
      if (ok) {
        ctx.helper.success(ctx, { team_id: ok }, null);
      } else {
        ctx.helper.fail(ctx, null, '创建失败');
      }
    } catch (err) {
      ctx.helper.fail(ctx, null, err.message);
    }
  }

  async update() {
    const { ctx } = this;
    let row = {};
    const teamId = ctx.request.body.teamId;
    row.team_name = ctx.request.body.teamName;
    row.team_require = ctx.request.body.teamRequire;
    try {
      const ok = await ctx.service.team.updateTeamInfo(row, teamId);
      if (ok) {
        ctx.helper.success(ctx, null, null);
      } else {
        ctx.helper.fail(ctx, null, '修改失败');
      }
    } catch (err) {
      ctx.helper.fail(ctx, null, err.message);
    }
  }

  async attribute() {
    const { ctx } = this;
    const teamId = ctx.request.body.teamId;
    try {
      const ok = await ctx.service.team.getTeamRequireName(teamId);
      if (ok) {
        ctx.helper.success(ctx, { team_require: ok.team_require, team_name: ok.team_name }, null);
      } else {
        ctx.helper.fail(ctx, null, '请求失败');
      }
    } catch (err) {
      ctx.helper.fail(ctx, null, err.message);
    }
  }

  async teacherGet() {
    const { ctx } = this;
    const teamId = ctx.request.body.teamId;
    try {
      const { teachers } = await ctx.service.team.getTeachersByTeamId(teamId);
      if (teachers !== null) {
        ctx.helper.success(ctx, { teachers }, null);
      } else {
        ctx.helper.fail(ctx, null, '请求失败');
      }
    } catch (err) {
      ctx.helper.fail(ctx, null, err.message);
    }
  }

  async memberGet() {
    const { ctx } = this;
    const teamId = ctx.request.body.teamId;
    try {
      const members = await ctx.service.team.getMembersByTeamId(teamId);
      if (members) {
        ctx.helper.success(ctx, { members }, null);
      } else {
        ctx.helper.fail(ctx, null, '请求失败');
      }
    } catch (err) {
      ctx.helper.fail(ctx, null, err.message);
    }
  }

  async memberDel() {
    const { ctx } = this;
    const personId = ctx.request.body.personId;
    const teamId = ctx.request.body.teamId;

    const ok = await ctx.service.team.memberDel(teamId, personId);
    if (ok) {
      ctx.helper.success(ctx, null, null);
    } else {
      ctx.helper.fail(ctx, null, '移除失败，请重试！');
    }
  }

  async del() {
    const { ctx, service } = this;
    const teamId = ctx.request.body.teamId;
    const ok2 = await service.team.deleteTeamAndPerson(teamId);
    const ok1 = await service.team.deleteTeam(teamId);
    if (ok1 && ok2) {
      ctx.helper.success(ctx, null, null);
    } else {
      ctx.helper.fail(ctx, null, '删除队伍失败！');
    }
  }

  async invite() {
    const { ctx } = this;
    let row = {};
    row.invite_person_id = ctx.request.body.personId;
    row.team_id = ctx.request.body.teamId;
    const { inviteMsg } = await ctx.service.message.getInviteMsgByUserIdTeamId(row.invite_person_id, row.team_id);
    if (inviteMsg) {
      ctx.helper.fail(ctx, null, '你已经成功发送消息，请勿重新发送');
      return;
    }
    row.team_leader_id = ctx.service.userAccess.getUserId();
    const ok = await this.service.team.invite(row);
    if (ok) {
      ctx.helper.success(ctx, null, null);
    } else {
      ctx.helper.fail(ctx, null, '邀请消息发送失败！');
    }
  }

  async apply() {
    const { ctx } = this;
    let row = {};
    row.team_id = ctx.request.body.teamId;
    row.apply_introduction = ctx.request.body.introduction;
    const {team} = await ctx.service.team.getTeamByTeamId(row.team_id);
    row.team_leader_id = team.team_leader_id;
    const { applyMsg } = await ctx.service.message.getApplyMsgByUserIdTeamId(row.team_leader_id, row.team_id);
    if (applyMsg) {
      ctx.helper.fail(ctx, null, '你已经成功发送消息，请勿重新发送');
      return;
    }
    row.apply_person_id = await ctx.service.userAccess.getUserId();
    const ok = await this.service.team.apply(row);
    if (ok) {
      ctx.helper.success(ctx, null, null);
    } else {
      ctx.helper.fail(ctx, null, '申请消息发送失败！');
    }
  }
}

module.exports = TeamController;
