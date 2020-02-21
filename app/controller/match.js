'use strict';

const Controller = require('egg').Controller;
var Moment = require('moment');

class MatchController extends Controller {

  async basic() {
    const { ctx } = this;
    try {
      const { basicMatches } = await ctx.service.match.basic();
      for (let i = 0; i < basicMatches.length; i++) {
        basicMatches[i].teamData = await ctx.service.team.all(basicMatches[i].m_id);
      }
      ctx.helper.success(ctx, { basicMatches: basicMatches }, null);
    } catch (err) {
      ctx.helper.fail(ctx, null, err.message);
    }
  }

  async detail() {
    const { ctx } = this;
    const mId = ctx.request.body.mId;
    try {
      const { detailMatch } = await ctx.service.match.detail(mId);
      if (detailMatch) {
        detailMatch.m_time = detailMatch.m_start_time.toLocaleDateString() + ' 至 ' + detailMatch.m_end_time.toLocaleDateString();
      }
      ctx.helper.success(ctx, detailMatch, null);
    } catch (err) {
      ctx.helper.fail(ctx, null, err.message);
    }
  }

  async create() {
    const { ctx } = this;
    const row = ctx.request.body;
    const userId = await ctx.service.userAccess.getUserId();
    row.m_contact_person = await ctx.service.user.getUserRealName(userId);
    row.m_contact_person_id = userId;
    const m_start_time = Moment(row.m_start_time).format("YYYY-MM-DD HH:mm:ss");
    const m_end_time = Moment(row.m_end_time).format("YYYY-MM-DD HH:mm:ss");
    delete row.m_start_time;
    delete row.m_start_time;
    row.m_start_time = m_start_time;
    row.m_end_time = m_end_time;
    try {
      const result = await ctx.service.match.create(row);
      if (result) {
        ctx.helper.success(ctx, null, null);
      }
    } catch (err) {
      ctx.helper.fail(ctx, null, err.message);
    }
  }

  async update() {
    const { ctx } = this;
    const row = ctx.request.body;
    const m_start_time = Moment(row.m_start_time).format("YYYY-MM-DD HH:mm:ss");
    const m_end_time = Moment(row.m_end_time).format("YYYY-MM-DD HH:mm:ss");
    delete row.m_start_time;
    delete row.m_start_time;
    row.m_start_time = m_start_time;
    row.m_end_time = m_end_time;
    const mId = row.m_id;
    delete row.m_id;
    try {
      const result = await ctx.service.match.update(row, mId);
      if (result) {
        ctx.helper.success(ctx, null, null);
      }
    } catch (err) {
      ctx.helper.fail(ctx, null, err.message);
    }
  }

  async all() {
    const { ctx } = this;
    const userId = ctx.service.userAccess.getUserId();
    try {
      const { allTeacherMatches } = await ctx.service.match.getMatchesByUserId(userId);
      ctx.helper.success(ctx, { allTeacherMatches: allTeacherMatches }, null);
    } catch (err) {
      ctx.helper.fail(ctx, null, err.message);
    }
  }

  async userJoin() {
    const { ctx } = this;
    const userId = ctx.service.userAccess.getUserId();
    try {
      const allUserJoinMatches = await ctx.service.match.getMatchesByleaderId(userId);
      ctx.helper.success(ctx, allUserJoinMatches, null);
    } catch (err) {
      ctx.helper.fail(ctx, null, err.message);
    }
  }

}


module.exports = MatchController;
