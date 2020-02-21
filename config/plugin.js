'use strict';

// 引入egg-mysql插件
exports.mysql = {
  enable: true,
  package: 'egg-mysql'
};

// 引入egg-redis插件
exports.redis = {
  enable: true,
  package: 'egg-redis',
};

// 引入egg-bcrypt加密包
exports.bcrypt = {
  enable: true,
  package: 'egg-bcrypt'
};

exports.cors = {
  enable: true,
  package: 'egg-cors'
};
