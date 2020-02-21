'use strict';

const Service = require('egg').Service;

class MessageService extends Service {
    async getInviteMsg(userId) {
        const inviteMsgs = await this.app.mysql.query(
            'SELECT a.invite_id,a.team_id,a.invite_message_read, b.s_name, b.s_email, d.m_name FROM ((invite_table a JOIN student_info_table b ON a.team_leader_id = b.s_id) JOIN team_table c on c.team_id = a.team_id) JOIN match_table d ON c.team_join_id = d.m_id WHERE a.invite_person_id = ?',
            [userId]);
        if (inviteMsgs) {
            return inviteMsgs;
        } else {
            return false;
        }
    }

    async getSendMsg(userId) {
        const inviteMsgs = await this.app.mysql.query(
            'SELECT a.invite_id,a.team_id,a.invite_station, b.s_name, b.s_email, d.m_name FROM ((invite_table a JOIN student_info_table b ON a.invite_person_id = b.s_id) JOIN team_table c on c.team_id = a.team_id) JOIN match_table d ON c.team_join_id = d.m_id WHERE a.team_leader_id = ?',
            [userId]);
        const inviteMsgsTeacher = await this.app.mysql.query(
            'SELECT a.invite_id,a.team_id,a.invite_station, b.t_name, b.t_email, d.m_name FROM ((invite_table a JOIN teacher_info_table b ON a.invite_person_id = b.t_id) JOIN team_table c on c.team_id = a.team_id) JOIN match_table d ON c.team_join_id = d.m_id WHERE a.team_leader_id = ?',
            [userId]
        );
        const applyMsgs = await this.app.mysql.query(
            'SELECT a.apply_id,a.team_id,a.apply_introduction,a.apply_station, b.s_name, b.s_email, d.m_name FROM ((apply_table a JOIN student_info_table b ON a.team_leader_id = b.s_id) JOIN team_table c on c.team_id = a.team_id) JOIN match_table d ON c.team_join_id = d.m_id WHERE a.apply_person_id = ?',
            [userId]);
        return { inviteMsgsTeacher, inviteMsgs, applyMsgs };
    }

    async getApplyMsg(userId) {
        const applyMsgs = this.app.mysql.query(
            'SELECT a.apply_person_id,a.apply_id,a.team_id,a.apply_introduction,a.apply_message_read, b.s_name, b.s_email, d.m_name FROM ((apply_table a JOIN student_info_table b ON a.team_leader_id = b.s_id) JOIN team_table c on c.team_id = a.team_id) JOIN match_table d ON c.team_join_id = d.m_id WHERE a.team_leader_id = ?',
            [userId]
        );
        if (applyMsgs) {
            return applyMsgs;
        } else {
            return false;
        }
    }

    async getInviteMsgByUserIdTeamId(userId, teamId) {
        const inviteMsg = await this.app.mysql.get('invite_table', {
            invite_person_id: userId,
            team_id: teamId
        });
        if (inviteMsg) {
            return { inviteMsg };
        } else {
            return false;
        }
    }

    async getApplyMsgByUserIdTeamId(userId, teamId) {
        const applyMsg = await this.app.mysql.get('apply_table', {
            team_leader_id: userId,
            team_id: teamId
        });
        if (applyMsg) {
            return { applyMsg };
        } else {
            return false;
        }
    }

    async setMsgRead(msgId) {
        const applyMsg = await this.app.mysql.get('apply_table',
            { apply_id: msgId });
        if (applyMsg) {
            const result = await this.app.mysql.update('apply_table',
                { apply_message_read: '1' },
                { where: { apply_id: msgId } });
            if (result.affectedRows === 1) {
                return true;
            } else {
                return false;
            }
        } else {
            const result = await this.app.mysql.update('invite_table',
                { invite_message_read: '1' },
                { where: { invite_id: msgId } });
            if (result.affectedRows === 1) {
                return true;
            } else {
                return false;
            }
        }
    }

    async setMsgState(msgId) {
        const applyMsg = await this.app.mysql.get('apply_table',
            { apply_id: msgId });
        if (applyMsg) {
            const result = await this.app.mysql.update('apply_table',
                { apply_station: '1' },
                { where: { apply_id: msgId } });
            if (result.affectedRows === 1) {
                return true;
            } else {
                return false;
            }
        } else {
            const result = await this.app.mysql.update('invite_table',
                { invite_station: '1' },
                { where: { invite_id: msgId } });
            if (result.affectedRows === 1) {
                return true;
            } else {
                return false;
            }
        }
    }

    async deleteMsgById(msgId) {
        const applyMsg = await this.app.mysql.get('apply_table',
            { apply_id: msgId });
        if (applyMsg) {
            const result = await this.app.mysql.delete('apply_table', { apply_id: msgId });
            if (result.affectedRows === 1) {
                return true;
            } else {
                return false;
            }
        } else {
            const result = await this.app.mysql.delete('invite_table',
            { invite_id: msgId } );
            if (result.affectedRows === 1) {
                return true;
            } else {
                return false;
            }
        }
    }


}

module.exports = MessageService;