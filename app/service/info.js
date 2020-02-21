'use strict';

const Service = require('egg').Service;

class InfoService extends Service {
    async getRemindMsg(userId, role) {
        const { ctx } = this;
        let msg = "";
        const {user} = await ctx.service.user.findByUserId(userId, role);
        switch(role) {
            case '0': 
            const plainTextStu = userId + "@123";
            const compareResStu = await ctx.compare(plainTextStu, user.s_password);
            if (compareResStu) {
                msg += "请即时修改默认密码！";
            }
                if (!user.s_email || !user.s_phonenumber || !user.s_profession) {
                    msg += "为了便于你成功组队，请将 ";
                    if (!user.s_email) {
                        msg += "邮箱，";
                    }
                    if (!user.s_phonenumber) {
                        msg += "手机号，";
                    }
                    if (!user.s_profession){
                        msg += "专业技能";
                    }
                    msg += " 信息填写完整！"
                }
            break;
            case '1': 
            const plainTextTea = userId + "@123";
            const compareResTea = await ctx.compare(plainTextTea, user.t_password);
            if (compareResTea) {
                msg += "请即时修改默认密码！";
            }
            if (!user.t_email || 
                !user.t_phonenumber || 
                !user.t_profession || 
                !user.t_profession_direction || 
                !user.t_introduction) {
                    msg += "为了您能顺利知道队伍，请将 ";
                    if (!user.t_email) {
                        msg += "邮箱，";
                    }
                    if (!user.t_phonenumber) {
                        msg += "手机号，";
                    }
                    if (!user.t_profession) {
                        msg += "专业，";
                    }
                    if (!user.t_profession_direction) {
                        msg += "研究方向，";
                    }
                    if (!user.t_introduction) {
                        msg += "个人简介";
                    }
                    msg += " 信息填写完整！";
                }
                break;
                default:
                    throw new Error('错误的角色类型！');
        }
        return msg;
    }
}

module.exports = InfoService;