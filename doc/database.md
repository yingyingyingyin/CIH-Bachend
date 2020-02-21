# 数据库表

## 学生学校信息表
| 字段名称 | 字段类型 | 字段说明 |
|---|---|---|
user_id | bigint(20) | 主键，学生学号或老师工号
user_real_name | varchar(10) | 用户真实姓名
user_role | tinyint(1) | 用户的角色，0 是学生，1 是导师，2是管理源

## 学生信息表(student_info_table)

| 字段名称 | 字段类型 | 字段说明 |
|---|---|---|
s_id | bigint |  主键,学生学号
s_name | varchar(10) | 学生姓名
s_gender | enum('男','女', '未知') | 学生性别
s_email | varchar | 学生邮箱信息
s_phonenumber | bigint(11) | 学生电话
s_profession | varchar | 学生专业信息
s_password | varchar | 学生登陆密码

## 教师信息表(teacher_info_table)

| 字段名称 | 字段类型 | 字段说明 |
|---|---|---|
t_id | bigint |  主键,教师ID
t_name | varchar(10) | 教师姓名
t_gender | enum('男','女','未知') | 教师性别
t_email | varchar | 教师邮箱信息
t_phonenumber | bigint(11) | 教师电话
t_profession | varchar | 教师所属专业学院
t_profession_direction | text | 教师专业方向
t_introduction | text | 教师简介
t_password | varchar | 教师登录密码

## 管理员信息表(root_info_table)

| 字段名称 | 字段类型 | 字段说明 |
|---|---|---|
root_id | bigint | 主键，管理员账号
root_name | varchar(10) | 管理员姓名
root_email | varchar | 管理员邮箱
root_password | varchar | 管理员登陆密码

## 赛事表(match_table)

| 字段名称 | 字段类型 | 字段说明 |
|---|---|---|
m_id | varchar(32) | UUID赛事编号
m_name | varchar | 赛事名称
m_sort | varchar | 赛事级别（县、市、省、国）
m_organizer | varchar | 赛事举办方
m_start_time | data | 比赛开始时间
m_end_time | data | 比赛结束时间
m_contact_person | varchar | 参赛联系负责人
m_introduction | text | 赛事简介
m_url | varchar(100) | 赛事官网地址
m_tag | varchar | 赛事专业分类
m_max_person | tinyint | 组队最大人数要求
m_contact_person_id | bigint(20) | 赛事联系负责人id

## 组队表(team_table)

| 字段名称 | 字段类型 | 字段说明 |
|---|---|---|
team_id | varchar(32) | UUID，组队ID
team_name | varchar | 队伍名称
team_leader_id | bigint | 队长ID，外键关联学生表
team_join_id | varchar(32) | 赛事ID，外键关联赛事表
team_require | text | 组队人员要求
team_current_person_number | int | 当前队伍人数
team_max_person_number | int | 队长设置队伍最大人数

<!-- ## 队伍成员信息表(teamer_table)

| 字段名称 | 字段类型 | 字段说明 |
|---|---|---|
team_id | varchar(32) | 外键关联组队表
teacher_id | bigint | 指导教师ID，外键管理教师信息表
student_id | bigint | 其他队员ID，外键关联学生信息表 -->

<!-- ### 学生组队情况表(student_join_team_table)

| 字段名称 | 字段类型 | 字段说明 |
|---|---|---|
s_id | bigint | 学生ID，外键关联学生信息表
team_id | int | 学生加入的队伍ID，外键关联组队表(s_id,team_id联合主键)

### 教师指导队伍情况表(teacher_guide_team_table)

| 字段名称 | 字段类型 | 字段说明 |
|---|---|---|
t_id | bigint | 教师ID，外键关联教师信息表
team_id | int | 教师指导队伍ID，外键关联组队表(t_id,team_id联合主键)
team_leader_id | bigint | 队长ID，外键关联组队表 -->

## 参加或指导队伍情况表(join_or_guide_table)

| 字段名称 | 字段类型 | 字段说明 |
|---|---|---|
person_id | bigint | 学生或老师ID
team_id | varchar(32) | 加入或指导队伍的ID

## 申请表(apply_table)

| 字段名称 | 字段类型 | 字段说明 |
|---|---|---|
apply_id | varchar(32) | 申请序号，UUID主键
team_id | varchar(32) | 申请队伍ID，外键关联组队表
team_leader_id | bigint | 队长ID外键关联组队表
apply_person_id | bigint | 当前申请人ID或队伍需要申请的指导教师ID
apply_introduction | text | 申请描述
apply_message_read | enum(0,1) | 申请消息阅读状态(0:未读；1：已读)
apply_station | enum(0,1) | 申请同意状态(0:未统一；1:已同意)

## 邀请表(invite_table)

| 字段名称 | 字段类型 | 字段说明 |
|---|---|---|
invite_id | varchar(32) | 邀请序号，自增主键
invite_person | bigint | 受邀人ID，外键关联学生信息表
team_id | varchar(32) | 队伍ID，关联外键组队表
team_leader_id | bigint | 队长ID，外键关联组队表
invite_message_read |  enum(0,1) | 邀请消息阅读状态(0:未读；1：已读)
invite_station |  enum(0,1) | 邀请消息阅读状态(0:未读；1：已读)
