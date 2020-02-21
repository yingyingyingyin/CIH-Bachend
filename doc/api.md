

# Api 文档

## 请求域

> <http://localhost:7001>

## 版本

> v1

## 请求参数格式

- Body

```json
{
    "key1": "value1",
    "key2": "value2"
}
```

## 响应参数格式

- return

```json
{
    "success": true,
    "data": {},
    "msg": "some info"
}
```

## 完整的api示例

例如获取所有的用户信息：

- <http://localhost:7001/v1/users>

## 可用于测试的用户

- 学生
  - userId：3001
  - role: 0
  - password: 3001
- 导师
  - userId: 111111
  - role: 1
  - password: 111111@123
- 管理员
  - userId: 1001
  - role: 2
  - password: 3001
  
## 所有api

### 人员信息

#### 登录

> POST /v1/user/login

- 备注：除了登录api不需要token，其他所有的api头部都需要加上token，axios在请求时设置，headers:{ 'Authorization':`Bearer ${token}`}

- body

```json
{
    "userId": "111111",
    "role": "1",
    "password": "111111@123"
}
```

- return

```json
{
    "success": true,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjExMTExMSIsInJvbGUiOiIxIn0sImV4cCI6MTU4MDk1NDE3NSwiaWF0IjoxNTgwODY3Nzc1fQ.bN9GnmpPf5xVJa_Q_Ygd8SA2jGeDnsznkXZZF72a9V8",
        "remind": true,
        "msg": "请即时修改默认密码！为了您能顺利知道队伍，请将 邮箱，手机号，专业，研究方向，个人简介 信息填写完整！",
        "realName": "彭金为"
    },
    "msg": null
}
```

#### 退出

> GET /v1/user/logout

- return

```json
{
    "success": true,
    "data": null,
    "msg": "您已成功退出账户！"
}
```

#### 获取用户角色

> GET /v1/user/role

- return

```json
{
    "success": true,
    "data": {
        "role": "0"
    },
    "msg": null
}
```

#### 获取用户信息

> GET /v1/user/info

- return

如果role=0，即学生

```json
{
    "success": true,
    "data": {
        "user": {
            "s_id": 3001,
            "s_name": "pjw",
            "s_gender": "男",
            "s_email": "3001@qq.com",
            "s_phonenumber": 3001,
            "s_profession": "物联网",
            "s_password": "$2a$10$J5xcYci9hvO/ea9AteqFteDUaT/H6dmqeYG/lK2w2tXI9l0G1WlqK"
        }
    },
    "msg": null
}
```

如果role=1，即导师

```json
{
    "success": true,
    "data": {
        "user": {
            "t_id": 2001,
            "t_name": "cjm",
            "t_gender": "男",
            "t_email": "2001@qq.com",
            "t_phonenumber": 2001,
            "t_profession": "物联网",
            "t_profession_direction": "物联网技术与软件设计",
            "t_introduction": "擅长程序设计",
            "t_password": "$2a$10$J5xcYci9hvO/ea9AteqFteDUaT/H6dmqeYG/lK2w2tXI9l0G1WlqK"
        }
    },
    "msg": null
}
```

如果role=2，即管理员

```json
{
    "success": true,
    "data": {
        "user": {
            "root_id": 1001,
            "root_name": "gly",
            "root_email": "1001@qq.com",
            "root_password": "$2a$10$J5xcYci9hvO/ea9AteqFteDUaT/H6dmqeYG/lK2w2tXI9l0G1WlqK"
        }
    },
    "msg": null
}
```

#### 用户修改个人信息

> POST /v1/user/info/update

如果是学生

- body
  
```json
{
    "s_gender": "男",
    "s_email": "234554323@qq.com",
    "s_phonenumber":"18852896562",
    "s_profession": "物联网工程"
}
```

- return

```json
{
    "success": true,
    "data": null,
    "msg": null
}
```

如果是导师

- body

```json
{
    "t_gender": "男",
    "t_email": "234554323@qq.com",
    "t_phonenumber": "18852896562",
    "t_profession": "计算机系",
    "t_profession_direction": "数据库",
    "t_introduction": "博士，擅长计算机视觉，多次获得xxx奖项"
}
```

- return

```json
{
    "success": true,
    "data": null,
    "msg": null
}
```

#### 老师和学生修改密码

> POST /v1/user/info/password/reset

- body
  
```json
{
    "oldPassword":"123456@123",
    "newPassword":"123456"
}
```

- return

```json
{
    "success": true,
    "data": null,
    "msg": null
}
```

#### 获取所有导师信息，用于寻找导师

> GET /v1/user/teacher/all

- return

```json
{
    "success": true,
    "data": {
        "teacherInfos": [
            {
                "t_id": 2001,
                "t_name": "cjm",
                "t_phonenumber": 2001,
                "t_email": "2001@qq.com",
                "t_profession": "物联网",
                "t_profession_direction": "物联网技术与软件设计",
                "t_introduction": "擅长程序设计"
            },
            {
                "t_id": 2002,
                "t_name": "xsm",
                "t_phonenumber": 2002,
                "t_email": "2002@qq.com",
                "t_profession": "物联网",
                "t_profession_direction": "Tinyos",
                "t_introduction": "擅长无线网络"
            },
            {
                "t_id": 2003,
                "t_name": "xyp",
                "t_phonenumber": 2003,
                "t_email": "2003@qq.com",
                "t_profession": "物联网",
                "t_profession_direction": "数据库教学",
                "t_introduction": "擅长数据库设计"
            }
        ]
    },
    "msg": null
}
```

### 赛事信息

#### 获取队长参加的赛事

> GET /v1/match/user/join

- return

```json
{
    "success": true,
    "data": {
        "allUserJoinMatches": [
            {
                "team_id": "1",
                "team_name": "竞赛小助手",
                "team_leader_id": 3001,
                "team_join_id": "1",
                "team_require": "熟悉计算机各种知识与应用熟悉计算机各种知识与应用熟悉计算机各种知识与应用",
                "team_current_person_number": 3,
                "team_max_person_number": 4
            },
            {
                "team_id": "2a80e700500911eabe616d2c6ff1df2d",
                "team_name": "非诚勿扰",
                "team_leader_id": 3001,
                "team_join_id": "deb999204fbd11ea842a570f5d6c1d1e",
                "team_require": "高富帅",
                "team_current_person_number": 1,
                "team_max_person_number": 5
            },
            {
                "team_id": "3b4f44d0508311eaab88113e89c8bcb1",
                "team_name": "选美大赛小队",
                "team_leader_id": 3001,
                "team_join_id": "deb999204fbd11ea842a570f5d6c1d1e",
                "team_require": null,
                "team_current_person_number": 1,
                "team_max_person_number": 5
            },
            {
                "team_id": "423b8cd0500c11ea92c97f9988c93280",
                "team_name": "选美大赛小队",
                "team_leader_id": 3001,
                "team_join_id": "deb999204fbd11ea842a570f5d6c1d1e",
                "team_require": null,
                "team_current_person_number": 1,
                "team_max_person_number": 5
            },
            {
                "team_id": "5e530b60508311eaaa517de8829fd609",
                "team_name": "选美大赛小队",
                "team_leader_id": 3001,
                "team_join_id": "deb999204fbd11ea842a570f5d6c1d1e",
                "team_require": null,
                "team_current_person_number": 1,
                "team_max_person_number": 5
            },
            {
                "team_id": "7a4a1e30508d11eab2c7e7d677f0c740",
                "team_name": "选美大赛小队",
                "team_leader_id": 3001,
                "team_join_id": "deb999204fbd11ea842a570f5d6c1d1e",
                "team_require": null,
                "team_current_person_number": 1,
                "team_max_person_number": 5
            }
        ]
    },
    "msg": null
}
```

#### 获取所有赛事的基本信息

> GET /v1/match/info/basic

- return

```json
{
    "success": true,
    "data": {
        "basicMatches": [
            {
                "m_id": 1,
                "m_name": "计算机设计大赛",
                "m_organizer": "江苏大学",
                "m_url": "https://www.baidu.com",
                "teamData": {
                    "teams": [
                        {
                            "team_id": 1,
                            "team_name": "竞赛小助手",
                            "team_require": "熟悉计算机各种知识与应用熟悉计算机各种知识与应用熟悉计算机各种知识与应用",
                            "team_current_person_number": 3
                        },
                        {
                            "team_id": 2,
                            "team_name": "物联网安卓平台",
                            "team_require": "熟悉安卓开发与物联网技术",
                            "team_current_person_number": 1
                        }
                    ]
                }
            },
        ]
    },
    "msg": null
}
```

#### 获取某一赛事的详细信息

> post /v1/match/info/detail

- body
  
```json
{
    "mId": "1"
}
```

- return

```json
{
    "success": true,
    "data": {
        "m_id": 1,
        "m_name": "计算机设计大赛",
        "m_sort": "校级",
        "m_organizer": "江苏大学",
        "m_start_time": "2020-1-1 00:00:00",
        "m_end_time": "2020-3-6 00:00:00",
        "m_time": "2020-1-1 至 2020-3-6",
        "m_contact_person": "王训兵",
        "m_introduction": "计算机学生创新设计比赛",
        "m_url": "www.baidu.com",
        "m_tag": "计算机类",
        "m_max_person": 4
    },
    "msg": null
}
```

#### 创建一个赛事

> POST /v1/match/create

- body

```json
{
	"m_name": "小米摄影大赛",
	"m_sort": "企业级",
	"m_organizer": "小米集团",
	"m_introduction": "本次大赛分设4大主题：超广角、微距、人物人像、4800万超清摄影。用户每天上传作品数不限，但不得重复提交同一作品。",
	"m_url": "http://hd.mi.com/w/19/03141m/index.html",
	"m_tag": "艺术类",
	"m_max_person": "1",
	"m_start_time": "Mon Feb 10 2020 11:21:56 GMT+0800 (中国标准时间)",
	"m_end_time": "Mon Feb 20 2020 11:21:56 GMT+0800 (中国标准时间)"
}
```

#### 修改一个赛事

> POST /v1/match/update

和创建赛事相比，仅增加一个`m_id`字段。

- body

```json
{
	"m_id": "deb999204fbd11ea842a570f5d6c1d1e",
	"m_name": "小米摄影大赛",
	"m_sort": "企业级",
	"m_organizer": "小米集团",
	"m_introduction": "本次大赛分设4大主题：超广角、微距、人物人像、4800万超清摄影。用户每天上传作品数不限，但不得重复提交同一作品。",
	"m_url": "http://hd.mi.com/w/19/03141m/index.html",
	"m_tag": "艺术类",
	"m_max_person": "1",
	"m_start_time": "Mon Feb 10 2020 11:21:56 GMT+0800 (中国标准时间)",
	"m_end_time": "Mon Feb 20 2020 11:21:56 GMT+0800 (中国标准时间)"
}
```

- return

```json
{
    "success": true,
    "data": null,
    "msg": null
}
```

#### 导师获取自己创建的所有赛事

> GET /v1/match/info/teacher/all

- return

```json
{
    "success": true,
    "data": {
        "allTeacherMatches": [
            {
                "m_id": "1",
                "m_name": "计算机设计大赛",
                "m_sort": "校级",
                "m_organizer": "江苏大学",
                "m_start_time": "2019-12-31T16:00:00.000Z",
                "m_end_time": "2020-03-05T16:00:00.000Z",
                "m_contact_person": "王训兵",
                "m_introduction": "计算机学生创新设计比赛",
                "m_url": "https://www.baidu.com",
                "m_tag": "计算机类",
                "m_max_person": 4,
                "m_contact_person_id": 111111
            },
            {
                "m_id": "2",
                "m_name": "2019年华为网络挑战赛",
                "m_sort": "企业",
                "m_organizer": "华为",
                "m_start_time": "2020-01-23T13:17:54.000Z",
                "m_end_time": "2020-02-14T13:17:59.000Z",
                "m_contact_person": "任正非",
                "m_introduction": "包含网络、软件等算法设计",
                "m_url": "http://ntec.huaweils.com/",
                "m_tag": "计算机类",
                "m_max_person": 4,
                "m_contact_person_id": 111111
            },
            {
                "m_id": "3",
                "m_name": "小米摄影大赛",
                "m_sort": "企业",
                "m_organizer": "小米集团",
                "m_start_time": "2020-01-30T13:20:07.000Z",
                "m_end_time": "2020-02-14T13:20:10.000Z",
                "m_contact_person": "雷军",
                "m_introduction": "本次大赛分设4大主题：超广角、微距、人物人像、4800万超清摄影。用户每天上传作品数不限，但不得重复提交同一作品。",
                "m_url": "http://hd.mi.com/w/19/03141m/index.html",
                "m_tag": "艺术类",
                "m_max_person": 1,
                "m_contact_person_id": 111111
            }
        ]
    },
    "msg": null
}
```

### 消息信息

#### 获取我接受的消息

> GET /v1/user/message/get

如果是学生，返回数据如下：

- return

```json
{
    "success": true,
    "data": {
        "inviteMsg1": [
            {
                "invite_id": "b4dfa0a050a211eab5a6c5eda6a1edd0",
                "team_id": "7a4a1e30508d11eab2c7e7d677f0c740",
                "invite_message_read": "0",
                "s_name": "pjw",
                "s_email": "3001@qq.com",
                "m_name": "选美大赛"
            }
        ],
        "applyMsgs": [
            {
            	"apply_id":"104ca05050a311ea99bc8b84cf1b81cb",
            	"team_id": "7a4a1e30508d11eab2c7e7d677f0c740",
                "apply_introduction": "我是全栈工程诗，而且会多门语言！",
                "apply_message_read": "0",
                "s_name": "pjw",
                "s_email": "3001@qq.com",
                "m_name": "选美大赛"
            }
        ]
    },
    "msg": null
}
```

如果是导师，返回数据如下：

```json
{
    "success": true,
    "data": {
        "inviteMsgs0": [
            {
                "invite_id": "1234565432345676543234567876543",
                "team_id": "423b8cd0500c11ea92c97f9988c93280",
                "invite_message_read": "0",
                "s_name": "pjw",
                "s_email": "3001@qq.com",
                "m_name": "选美大赛"
            }
        ]
    },
    "msg": null
}
```

#### 同意消息邀请

> POST /v1/user/message/agree

- body

```json
{
	"teamId": "7a4a1e30508d11eab2c7e7d677f0c740",
	"msgId": "b4dfa0a050a211eab5a6c5eda6a1edd0"
}
```

- return

```json
{
    "success": true,
    "data": null,
    "msg": null
}
```

#### 同意消息申请

> POST /v1/user/message/agreeApply

- body

```json
{
	"teamId": "23456543234565",
	"userId": "2343",
	"msgId": "23456543234567"
}
```

- return

```json
{
    "success": true,
    "data": null,
    "msg": null
}
```

```json

#### 获取我已经发送的消息

> GET /v1/user/message/send

- return

```json
{
    "success": true,
    "data": {
        "inviteMsgs": [
            {
                "invite_id": "021bb5d0508e11eab704ef450ee6ea42",
                "team_id": "7a4a1e30508d11eab2c7e7d677f0c740",
                "invite_station": "0", // 被邀请人是否已经同意
                "s_name": "pjw",
                "s_email": "3001@qq.com",
                "m_name": "选美大赛"
            },
            {
                "invite_id": "b4dfa0a050a211eab5a6c5eda6a1edd0",
                "team_id": "7a4a1e30508d11eab2c7e7d677f0c740",
                "invite_station": "1",
                "s_name": "pjw",
                "s_email": "3001@qq.com",
                "m_name": "选美大赛"
            }
        ],
        "applyMsgs": [
            {
                "apply_id": "104ca05050a311ea99bc8b84cf1b81cb",
                "team_id": "5e530b60508311eaaa517de8829fd609",
                "apply_introduction": "我是全栈工程诗，而且会多门语言！",
                "apply_station": "0",
                "s_name": "pjw",
                "s_email": "3001@qq.com",
                "m_name": "选美大赛"
            }
        ]
    },
    "msg": null
}
```

#### 将一条消息状态设置已回复

> POST /v1/user/message/read

- body

```json
{
	"msgId": "021bb5d0508e11eab704ef450ee6ea42"
}
```

- return

```json
{
    "success": true,
    "data": null,
    "msg": null
}
```

#### 删除一条消息

> POST /v1/user/message/del

- body

```json
{
	"msgId": "021bb5d0508e11eab704ef450ee6ea42"
}
```

- return

```json
{
    "success": true,
    "data": null,
    "msg": null
}
```

### 组队信息

#### 用户获取自己所有队伍

导师和学生均使用此接口请求数据。

> GET /v1/team/user/all

```json
{
    "success": true,
    "data": [
        {
            "team_name": "竞赛小助手",
            "team_require": "熟悉计算机各种知识与应用熟悉计算机各种知识与应用熟悉计算机各种知识与应用",
            "m_name": "计算机设计大赛",
            "member": "hjq wyy ",
            "teacher": "cjm ",
            "leaderPhone": 3001,
            "leaderName": "pjw",
            "index": 1
        },
        {
            "team_name": "竞赛小助手",
            "team_require": "熟悉计算机各种知识与应用熟悉计算机各种知识与应用熟悉计算机各种知识与应用",
            "m_name": "计算机设计大赛",
            "member": "hjq wyy ",
            "teacher": "cjm ",
            "leaderPhone": 3001,
            "leaderName": "pjw",
            "index": 1
        }
    ],
    "msg": null
}
```

#### 获取某一赛事的所有已组队伍


> POST /v1/team/match/all

- body

```json
{
    "mId: 1"
}
```

- return

```json
{
    "success": true,
    "data": [
        {
            "team_id": 1,
            "team_name": "竞赛小助手",
            "team_require": "熟悉计算机各种知识与应用",
            "team_current_person_number": 3,
            "index": 1
        },
        {
            "team_id": 2,
            "team_name": "物联网安卓平台",
            "team_require": "熟悉安卓开发与物联网技术",
            "team_current_person_number": 1,
            "index": 2
        }
    ],
    "msg": null
}
```

#### 创建新的队伍

> POST /v1/team/user/add

请求头中传赛事的id。

- body

```json
{
	"mId":"deb999204fbd11ea842a570f5d6c1d1e"
}
```

- return

```json
{
    "success": true,
    "data": null,
    "msg": null
}
```

#### 修改队伍信息

> POST /v1/team/user/update

- body

```json
{
	"teamId": "2a80e700500911eabe616d2c6ff1df2d",
	"teamName": "非诚勿扰",
	"teamRequire": "高富帅"
}
```

- return

```json
{
    "success": true,
    "data": null,
    "msg": null
}
```

#### 获取队伍要求和名称

> POST /v1/team/user/attribute

- body

```json
{
	"teamId": "2a80e700500911eabe616d2c6ff1df2d",
}
```

- return

```json
{
    "success": true,
    "data": {
        "team_require": "高富帅",
        "team_name": "非诚勿扰"
    },
    "msg": null
}
```

#### 获取当前队伍的成员

> POST /v1/team/member/get

- body

```json
{
	"teamId": "1"
}
```

- return

```json
{
    "success": true,
    "data": {
        "members": {
            "members": [
                {
                    "s_name": "pjw",
                    "s_id": 3001,
                    "s_email": "3001@qq.com"
                },
                {
                    "s_name": "hjq",
                    "s_id": 3002,
                    "s_email": "3002@qq.com"
                },
                {
                    "s_name": "wyy",
                    "s_id": 3003,
                    "s_email": "3003@qq.com"
                }
            ]
        }
    },
    "msg": null
}
```

#### 获取当前队伍的导师

> POST /v1/team/teacher/get

- body

```json
{
	"teamId": "1"
}
```

- return

```json
{
    "success": true,
    "data": {
        "teachers": [
            {
                "t_name": "cjm",
                "t_id": 2001,
                "t_email": "2001@qq.com"
            }
        ]
    },
    "msg": null
}
```

#### 将某一成员移除队伍（学生或导师）

> POST /v1/team/member/del

- body

```json
{
	"personId": "3003",
	"teamId": "1",
}
```

- return

```json
{
    "success": true,
    "data": null,
    "msg": null
}
```

#### 删除一个队伍

> POST /v1/team/del

- body

```json
{
	"teamId":"ea27e980508811eab4db7b1baf69d89b"
}
```

- return

```json
{
    "success": true,
    "data": null,
    "msg": null
}
```

#### 邀请一个成员（学生或者导师）

> POST /v1/team/user/invite

- body

```json
{
	"userId": "123456", //导师或者学生的学号
	"teamId": "7a4a1e30508d11eab2c7e7d677f0c740"
}
```

- return

```json
{
    "success": true,
    "data": null,
    "msg": null
}
```

#### 学生申请加入一个队伍

> POST /v1/team/user/apply

- body

```json
{
	"teamId":"5e530b60508311eaaa517de8829fd609",
	"introduction": "我是全栈工程诗，而且会多门语言！"
}
```

- return

```json
{
    "success": true,
    "data": null,
    "msg": null
}
```

### 管理员

#### 添加一个用户

> POST /v1/admin/user/add

- 备注：管理员添加的用户，默认密码是 {userid}@123

- body

```json
{
    "userId": "3170611072",
    "role": "0",
    "realName": "彭金为"
}
```

- return

```json
{
    "success": true,
    "data": null,
    "msg": "添加成功!"
}
```

#### 获取所有用户信息

> GET /v1/admin/user/all

- return

```json
{
    "success": true,
    "data": {
        "allUsers": [
            {
                "user_id": 2001,
                "user_real_name": "陈继明",
                "user_role": 1
            },
            {
                "user_id": 2002,
                "user_real_name": "熊书明",
                "user_role": 1
            }
        ]
    },
    "msg": null
}
```

#### 删除一个用户

> POST /v1/admin/user/del

- body

```json
{
    "userId": "3170611072",
    "role": "1",
}
```

- return

```json
{
    "success": true,
    "data": null,
    "msg": "删除成功！"
}
```
