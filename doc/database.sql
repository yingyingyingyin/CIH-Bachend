CREATE database jsjsj;

USE jsjsj;

CREATE TABLE `student_school_info` (
  `user_id` bigint(20) NOT NULL,
  `user_real_name` varchar(10) NOT NULL,
  `user_role` tinyint(1) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `student_school_info_chk_1` CHECK ((`user_id` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `student_info_table` (
  `s_id` bigint(20) NOT NULL,
  `s_name` varchar(10) NOT NULL,
  `s_gender` enum('男','女','未知') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '未知',
  `s_email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `s_phonenumber` bigint(11) DEFAULT NULL,
  `s_profession` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `s_password` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`s_id`),
  CONSTRAINT `student_info_table_ibfk_1` FOREIGN KEY (`s_id`) REFERENCES `student_school_info` (`user_id`),
  CONSTRAINT `student_info_table_chk_1` CHECK ((`s_id` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO student_info_table
VALUES
(3001,'pjw','男','3001@qq.com',3001,'物联网','3001'),
(3002,'hjq','男','3002@qq.com',3002,'物联网','3002'),
(3003,'wyy','女','3003@qq.com',3003,'计算机','3003'),
(3004,'wyr','女','3004@qq.com',3004,'软件工程','3004');

CREATE TABLE `teacher_info_table` (
  `t_id` bigint(20) NOT NULL,
  `t_name` varchar(10) NOT NULL,
  `t_gender` enum('男','女','未知') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '未知',
  `t_email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `t_phonenumber` bigint(11) DEFAULT NULL,
  `t_profession` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `t_profession_direction` text,
  `t_introduction` text,
  `t_password` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`t_id`),
  CONSTRAINT `teacher_info_table_ibfk_1` FOREIGN KEY (`t_id`) REFERENCES `student_school_info` (`user_id`),
  CONSTRAINT `teacher_info_table_chk_1` CHECK ((`t_id` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO teacher_info_table
VALUES
(2001,'cxy','男','2001@qq.com',2001,'物联网','物联网技术与软件设计','擅长程序设计','2001'),
(2002,'xsm','男','2002@qq.com',2002,'物联网','Tinyos','擅长无线网络','2001'),
(2003,'xyp','女','2003@qq.com',2003,'物联网','数据库教学','擅长数据库设计','2001');

CREATE TABLE `root_info_table` (
  `root_id` int(11) NOT NULL,
  `root_name` varchar(10) NOT NULL,
  `root_email` varchar(30) NOT NULL,
  `root_password` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`root_id`),
  CONSTRAINT `root_info_table_chk_1` CHECK ((`root_id` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO root_info_table
VALUES
(1001,'gly','1001@qq.com','1001');

CREATE TABLE `match_table` (
  `m_id` varchar(32) NOT NULL,
  `m_name` varchar(20) NOT NULL,
  `m_sort` varchar(10) NOT NULL,
  `m_organizer` varchar(20) NOT NULL,
  `m_start_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `m_end_time` timestamp NOT NULL,
  `m_contact_person` varchar(10) NOT NULL,
  `m_introduction` text,
  `m_url` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `m_tag` varchar(50) NOT NULL,
  `m_max_person` tinyint(4) NOT NULL DEFAULT '4',
  `m_contact_person_id` bigint(20) NOT NULL,
  PRIMARY KEY (`m_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO match_table
VALUES
(1,'计算机设计大赛','校级','江苏大学','2020-1-1','2020-2-1','王训兵','计算机学生创新设计比赛','www.baidu.com','计算机类',4);

CREATE TABLE `team_table` (
  `team_id` varchar(32) NOT NULL,
  `team_name` varchar(20) NOT NULL,
  `team_leader_id` bigint(20) NOT NULL,
  `team_join_id` varchar(32) NOT NULL,
  `team_require` text,
  `team_current_person_number` int(11) NOT NULL DEFAULT '1',
  `team_max_person_number` int(11) NOT NULL DEFAULT '4',
  PRIMARY KEY (`team_id`),
  KEY `team_leader_id` (`team_leader_id`),
  KEY `team_table_ibfk_1` (`team_join_id`),
  CONSTRAINT `team_table_ibfk_1` FOREIGN KEY (`team_join_id`) REFERENCES `match_table` (`m_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `team_table_ibfk_2` FOREIGN KEY (`team_leader_id`) REFERENCES `student_info_table` (`s_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO team_table
VALUES
(1,'竞赛小助手',3001,1,'熟悉计算机各种知识与应用',3),
(2,'物联网安卓平台',3004,1,'熟悉安卓开发与物联网技术',1);

CREATE TABLE `teamer_table` (
  `team_id` varchar(32) NOT NULL,
  `teacher_id` bigint(20) DEFAULT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  UNIQUE KEY `student_team` (`team_id`,`student_id`) USING BTREE,
  UNIQUE KEY `teacher_team` (`team_id`,`teacher_id`) USING BTREE,
  KEY `teacher_id` (`teacher_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `teamer_table_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teacher_info_table` (`t_id`),
  CONSTRAINT `teamer_table_ibfk_3` FOREIGN KEY (`student_id`) REFERENCES `student_info_table` (`s_id`),
  CONSTRAINT `teamer_table_ibfk_4` FOREIGN KEY (`team_id`) REFERENCES `team_table` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO teamer_table
VALUES
(1,2001,NULL),
(2,2002,NULL),
(1,NULL,3001),
(1,NULL,3002),
(1,NULL,3003),
(2,NULL,3004);

CREATE TABLE `join_or_guide_table` (
  `person_id` bigint(20) NOT NULL,
  `team_id` varchar(32) NOT NULL,
  PRIMARY KEY (`person_id`,`team_id`),
  KEY `team_id` (`team_id`),
  CONSTRAINT `join_or_guide_table_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team_table` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO join_or_guide_table
VALUES
(2001,1),
(2002,2),
(3001,1),
(3002,1),
(3003,1),
(3004,2);

CREATE TABLE `apply_table` (
  `apply_id` varchar(32) NOT NULL,
  `team_id` varchar(32) NOT NULL,
  `team_leader_id` bigint(20) NOT NULL,
  `apply_person_id` bigint(20) NOT NULL,
  `apply_introduction` text NOT NULL,
  `apply_message_read` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `apply_station` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`apply_id`),
  UNIQUE KEY `apply_person_id_and_team_id` (`team_id`,`apply_person_id`),
  KEY `team_leader_id` (`team_leader_id`),
  CONSTRAINT `apply_table_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team_table` (`team_id`),
  CONSTRAINT `apply_table_ibfk_2` FOREIGN KEY (`team_leader_id`) REFERENCES `team_table` (`team_leader_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `invite_table` (
  `invite_id` varchar(32) NOT NULL,
  `invite_person_id` bigint(20) NOT NULL,
  `team_id` varchar(32) DEFAULT NULL,
  `team_leader_id` bigint(20) DEFAULT NULL,
  `invite_message_read` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `invite_station` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`invite_id`),
  KEY `invite_person_id` (`invite_person_id`),
  KEY `team_leader_id` (`team_leader_id`),
  KEY `team_id` (`team_id`),
  CONSTRAINT `invite_table_ibfk_1` FOREIGN KEY (`invite_person_id`) REFERENCES `student_info_table` (`s_id`),
  CONSTRAINT `invite_table_ibfk_3` FOREIGN KEY (`team_leader_id`) REFERENCES `team_table` (`team_leader_id`),
  CONSTRAINT `invite_table_ibfk_4` FOREIGN KEY (`team_id`) REFERENCES `team_table` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO invite_table
VALUES
(1,3004,1,3001),
(2,3001,2,3004);
