'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  /**
   * 人员信息
   */

  router.get('/v1/user/role', controller.user.getRole);
  // 用户登录
  router.post('/v1/user/login', controller.user.login);

  // 用户退出
  router.get('/v1/user/logout', controller.user.logout);

  // 用户信息
  router.get('/v1/user/info', controller.user.info);

  // 用户信息修改
  router.post('/v1/user/info/update', controller.user.update);

  // 用户密码修改
  router.post('/v1/user/info/password/reset', controller.user.reset);

  // 获取所有导师信息
  router.get('/v1/user/teacher/all', controller.user.teacherAll);

  /**
   * 赛事信息
   */

  // 所有赛事基本信息
  router.get('/v1/match/info/basic', controller.match.basic);

  // 某个赛事详细信息
  router.post('/v1/match/info/detail', controller.match.detail);

  // 获取某一导师创建的所有赛事
  router.get('/v1/match/info/teacher/all', controller.match.all);

  // 发布赛事
  router.post('/v1/match/create', controller.match.create);

  // 赛事信息修改
  router.post('/v1/match/update', controller.match.update);

  // 获取队长参加的所有比赛
  router.get('/v1/match/user/join', controller.match.userJoin);


  // 导师获取

  /**
   * 消息信息
   */
  // 邀请一个成员（学生或导师）加入队伍
  router.post('/v1/team/user/invite', controller.team.invite);

  // 获取我接受的消息
  router.get('/v1/user/message/get', controller.user.messageGet);

  // 获取我发送的消息
  router.get('/v1/user/message/send', controller.user.messageSend);

  // 同意邀请
  router.post('/v1/user/message/agree', controller.user.messageAgree);

  // 同意申请
  router.post('/v1/user/message/agreeApply', controller.user.messageAgreeApply)

  // 申请加入队伍
  router.post('/v1/team/user/apply', controller.team.apply);

  // 将消息值于已读状态
  router.post('/v1/user/message/read', controller.user.messageRead)

  // 删除一条消息
  router.post('/v1/user/message/del', controller.user.messageDel)
  /**
   * 组队信息
   */
  // 某个赛事当前所有已组队伍
  router.post('/v1/team/match/all', controller.team.all);

  // 获取我的队伍信息
  router.get('/v1/team/user/all', controller.team.userall);

  // 创建队伍
  router.post('/v1/team/user/add', controller.team.add);

  // 修改队伍信息
  router.post('/v1/team/user/update', controller.team.update);

  // 获取队伍要求和名称
  router.post('/v1/team/user/attribute', controller.team.attribute);

  // 获取当前队伍的导师
  router.post('/v1/team/teacher/get', controller.team.teacherGet);

  // 获取当前队伍的队员
  router.post('/v1/team/member/get', controller.team.memberGet);

  // 将某一成员移除队伍
  router.post('/v1/team/member/del', controller.team.memberDel);

  // 解散队伍
  router.post('/v1/team/del', controller.team.del);




  /**
   * 管理员功能相关api
   */

  // 添加用户
  router.post('/v1/admin/user/add', controller.admin.add);

  // 删除用户
  router.post('/v1/admin/user/del', controller.admin.del);

  // 显示用户
  router.get('/v1/admin/user/all', controller.admin.all);

};
