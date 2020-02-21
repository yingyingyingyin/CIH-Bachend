# CIH-Backend - 竞赛小助手后端

<img src="./logo.png" width="100%"/>

## 技术栈简介

+ [Egg.js](https://eggjs.org/zh-cn/)
+ Mysql8.0
+ Redis

## 快速开始

<!-- add docs here for user -->
### 本地开发环境准备

+ 运行环境：建议 node 选择 LTS 版本，最低要求 8.x。
+ 源代码获取：创建好工作目录并使用以下命令获取代码

```bash
$ git clone https://github.com/yingyingyingyin/CIH-Bachend.git
```
+ 修改 `config/config.default.js`中关于mysql和redis链接的配置
+ 将`doc/database.sql`导入数据库，完成数据库初始化

+ 再项目的根目录执行以下命令运行本地项目
  
```bash
$ npm install && npm run dev
```
至此你就可以使用Postman等测试工具进行测试在开发

### 项目部署

+ 下载本项目的发行版本，上传至服务器。使用以下命令进行解压。

```bash
$ tar -xvf  [filename].tar.gz
```
+ 运行以下命令进行依赖的安装

```bash
$ npm install
```

+ 启动项目

```bash
$ npm start
```

+ 停止项目

```bash
$ npm stop
```
### 项目相关文档

+ [接口说明文档](doc/api.md)
+ [数据库设计说明文档](doc/database.md)

### 开源协议

Apache 2.0

### 博客地址

[小宇宙的前端客栈](https://yingyingyingyin.github.io/)
