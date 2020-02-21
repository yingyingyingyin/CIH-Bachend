/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1579529186897_2701';

  // add your middleware config here
  config.middleware = ['jwtM'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // jwt配置
  config.jwtM = {
    enable: true,
    ignore: ['/v1/user/login',
      '/v1/match/info/basic',
      '/v1/match/info/detail',
      '/v1/team/match/all',
      '/v1/team/match/require'],
    secret: '_cihwyypjwhju$$',
  };

  // mysql连接配置
  config.mysql = {
    client: {
      host: '<yourhostname>',
      port: '<port>',
      user: '<yourusername>',
      password: '<password>',
      database: '<database>'
    },
  };

  // 加密模块配置
  config.bcrypt = {
    saltRounds: 10,
  };

  // redis连接配置
  config.redis = {
    client: {
      port: '6379',          // Redis port
      host: '<yourhostname>',   // Redis host
      password: '<password>',
      db: 0,
    },
  };


  // 关闭csrf验证，前后端分离，不适用egg提供的模板
  config.security = {
    csrf: {
      enable: false
    }
  };

  // 允许跨域
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH'
  };

  return {
    ...config,
    ...userConfig,
  };
};
