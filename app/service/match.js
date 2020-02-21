'use strict';

const Service = require('egg').Service;
const uuidv1 = require('uuid/v1');


class MatchService extends Service {
  async basic() {
    const basicMatches = await this.app.mysql.query(
      'select m_id, m_name,m_organizer,m_url from match_table where m_end_time > now()'
    );
    if (!basicMatches) {
      throw new Error('查询失败，请重试！');
    }
    return { basicMatches };
  }

  async detail(mId) {
    const detailMatch = await this.app.mysql.get('match_table', { m_id: mId });
    if (!detailMatch) {
      throw new Error('查询失败，没有此赛事！');
    }
    return { detailMatch };
  }

  async create(row) {
    row.m_id = uuidv1().replace(/-/g, '');
    const result = await this.app.mysql.insert(
      'match_table',
      row
    );
    if (result.affectedRows === 1) {
      return true
    }
    return false
  }

  async update(row, mId) {
    const result = await this.app.mysql.update(
      'match_table',
      row,
      {
        where: {
          m_id: mId
        }
      }
    );
    if (result.affectedRows === 1) {
      return true
    }
    return faluse
  }

  async getMatchesByUserId(userId) {
    const allTeacherMatches = await this.app.mysql.select('match_table',{
      where: {
        m_contact_person_id: userId
      }
    }
    );
    if (!allTeacherMatches) {
      throw new Error('查询失败，请重试');
    }
    return { allTeacherMatches }
  }

  async getMatchesByleaderId(userId) {
    const allUserJoinMatches = await this.app.mysql.query(
      'SELECT a.*, b.m_name,b.m_id  FROM team_table a JOIN match_table b ON a.team_join_id = b.m_id WHERE a.team_leader_id = ?', [userId]
    );
    return {allUserJoinMatches};
  }
}

module.exports = MatchService;