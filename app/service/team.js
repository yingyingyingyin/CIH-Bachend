'use strict';

const Service = require('egg').Service;
const uuidv1 = require('uuid/v1');


class TeamService extends Service {
  async all(mId) {
    const teams = await this.app.mysql.select('team_table',
      {
        where: { team_join_id: `${mId}` }, // WHERE 条件
        columns: ['team_id', 'team_name', 'team_require', 'team_current_person_number'], // 要查询的表字段
      });
    if (!teams) {
      throw new Error('此比赛暂时没有已组队伍！');
    }
    return { teams };
  }

  async getAllTeamsByUserId(userId) {
    const teams = await this.app.mysql.query(
      'SELECT a.person_id, b.team_name, b.team_leader_id, b.team_id, b.team_require, c.m_name from (join_or_guide_table a JOIN team_table b ON a.team_id = b.team_id) JOIN match_table c ON c.m_id = b.team_join_id AND a.person_id = ?', [userId]);
    if (!teams) {
      throw new Error('查询失败');
    }
    return { teams };
  }

  async getTeamByTeamId(teamId) {
    const team = await this.app.mysql.get('team_table', { team_id: teamId });
    if (team) {
      return {team};
    } else {
      return false;
    }
  }

  async getMember(teamId, leaderId) {
    const members = await this.app.mysql.query(
      'SELECT b.s_name from join_or_guide_table a JOIN student_info_table b ON a.person_id = b.s_id AND a.team_id = ? AND a.person_id <> ?',
      [teamId, leaderId]
    );
    if (!members) {
      throw new Error('查询失败');
    }
    return { members };
  }

  async getTeacher(teamId) {
    const teachers = await this.app.mysql.query(
      'SELECT b.t_name from join_or_guide_table a JOIN teacher_info_table b ON a.person_id = b.t_id AND a.team_id = ?',
      [teamId]
    );
    if (!teachers) {
      throw new Error('查询失败');
    }
    return { teachers };
  }

  async createNewTeam(teaminfo) {
    const { service } = this;
    teaminfo.team_id = uuidv1().replace(/-/g, '');
    const result = await this.app.mysql.insert(
      'team_table', teaminfo
    );
    const ok = await service.team.teamAndPerson(teaminfo.team_id, teaminfo.team_leader_id)
    if (result.affectedRows === 1 && ok) {
      return teaminfo.team_id;
    }
    return null;
  }

  async updateTeamInfo(row, teamId) {
    const result = await this.app.mysql.update('team_table',
      row,
      {
        where: {
          team_id: teamId
        }
      });
    if (result.affectedRows === 1) {
      return true;
    }
    return false;
  }

  async getTeamRequireName(teamId) {
    const result = await this.app.mysql.get('team_table', { team_id: teamId });
    if (result) {
      return result;
    }
    return null;
  }

  async getMembersByTeamId(tId) {
    const members = await this.app.mysql.query(
      'SELECT b.s_name, b.s_id, b.s_email FROM join_or_guide_table a JOIN student_info_table b ON a.person_id = b.s_id WHERE a.team_id = ?',
      [tId]
    );
    if (!members) {
      throw new Error('查询失败');
    }
    return { members };
  }

  async getTeachersByTeamId(tId) {
    const teachers = await this.app.mysql.query(
      'SELECT b.t_name, b.t_id, b.t_email FROM join_or_guide_table a JOIN teacher_info_table b ON a.person_id = b.t_id WHERE a.team_id = ?',
      [tId]
    );
    if (!teachers) {
      throw new Error('查询失败');
    }
    return { teachers };
  }

  async memberDel(teamId, personId) {
    const result = await this.app.mysql.delete(
      'join_or_guide_table',
      { person_id: personId, team_id: teamId }
    );
    if (result.affectedRows !== 1) {
      return false;
    } else {
      return true;
    }
  }

  async teamAndPerson(teamId, personId) {
    const result = await this.app.mysql.insert(
      'join_or_guide_table',
      { person_id: personId, team_id: teamId }
    );
    if (result.affectedRows !== 1) {
      return false;
    } else {
      return true;
    }
  }

  async deleteTeamAndPerson(teamId) {
    const result = await this.app.mysql.delete(
      'join_or_guide_table',
      { team_id: teamId }
    );
    if (result.affectedRows !== 1) {
      return false;
    } else {
      return true;
    }
  }
  async deleteTeam(teamId) {
    const result = await this.app.mysql.delete(
      'team_table',
      { team_id: teamId }
    );
    if (result.affectedRows !== 1) {
      return false;
    } else {
      return true;
    }
  }

  async invite(row) {
    row.invite_id = uuidv1().replace(/-/g, '');
    row.invite_message_read = '0';
    row.invite_station = '0';
    const result = await this.app.mysql.insert(
      'invite_table',
      row
    );
    if (result.affectedRows !== 1) {
      return false;
    } else {
      return true;
    }
  }

  async apply(row) {
    row.apply_id = uuidv1().replace(/-/g, '');
    row.apply_message_read = '0';
    row.apply_station = '0';
    const result = await this.app.mysql.insert(
      'apply_table',
      row
    );
    if (result.affectedRows !== 1) {
      return false;
    } else {
      return true;
    }
  }

}
module.exports = TeamService;

