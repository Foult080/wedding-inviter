CREATE TABLE `users` (
  `id_user` smallint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `email` varchar(255),
  `password` text,
  `id_role` smallint,
  `crdate` datetime DEFAULT (now())
);

CREATE TABLE `roles` (
  `id_role` smallint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `robots` (
  `id_robot` smallint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) UNIQUE,
  `robot_desc` text,
  `crdate` datetime DEFAULT (now()),
  `mddate` datetime DEFAULT (now()),
  `cldate` datetime
);

CREATE TABLE `list_vm` (
  `id_vm` smallint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) UNIQUE,
  `vm_desc` text,
  `crdate` datetime DEFAULT (now()),
  `mddate` datetime DEFAULT (now()),
  `cldate` datetime
);

CREATE TABLE `service_accounts` (
  `id_service_account` smallint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) UNIQUE,
  `ac_desc` text,
  `crdate` datetime DEFAULT (now()),
  `mddate` datetime DEFAULT (now()),
  `cldate` datetime
);

CREATE TABLE `statuses` (
  `id_status` smallint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `organizations` (
  `id_organization` smallint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) UNIQUE,
  `org_desc` text,
  `crdate` datetime DEFAULT (now()),
  `mddate` datetime DEFAULT (now()),
  `cldate` datetime
);

CREATE TABLE `running_process` (
  `id_running_process` serial PRIMARY KEY AUTO_INCREMENT,
  `localid` varchar(36) UNIQUE,
  `id_vm` smallint,
  `id_robot` smallint,
  `id_service_account` smallint,
  `id_organization` smallint,
  `id_status` smallint,
  `message` text,
  `crdate` datetime DEFAULT (now()),
  `cldate` datetime
);

CREATE TABLE `list_reports` (
  `id_report` smallint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `report_desc` text,
  `crdate` datetime DEFAULT (now()),
  `mddate` datetime DEFAULT (now()),
  `cldate` datetime
);

CREATE TABLE `process_logs` (
  `id_process` serial PRIMARY KEY AUTO_INCREMENT,
  `id_running_process` bigint NOT NULL,
  `id_report` smallint,
  `id_status` smallint,
  `crdate` datetime DEFAULT (now()),
  `message` text
);

ALTER TABLE
  `running_process`
ADD
  FOREIGN KEY (`id_status`) REFERENCES `statuses` (`id_status`);

ALTER TABLE
  `running_process`
ADD
  FOREIGN KEY (`id_robot`) REFERENCES `robots` (`id_robot`);

ALTER TABLE
  `running_process`
ADD
  FOREIGN KEY (`id_vm`) REFERENCES `list_vm` (`id_vm`);

ALTER TABLE
  `users`
ADD
  FOREIGN KEY (`id_role`) REFERENCES `roles` (`id_role`);

ALTER TABLE
  `running_process`
ADD
  FOREIGN KEY (`id_organization`) REFERENCES `organizations` (`id_organization`);

ALTER TABLE
  `running_process`
ADD
  FOREIGN KEY (`id_service_account`) REFERENCES `service_accounts` (`id_service_account`);

ALTER TABLE
  `process_logs`
ADD
  FOREIGN KEY (`id_running_process`) REFERENCES `running_process` (`id_running_process`);

ALTER TABLE
  `process_logs`
ADD
  FOREIGN KEY (`id_report`) REFERENCES `list_reports` (`id_report`);

ALTER TABLE
  `process_logs`
ADD
  FOREIGN KEY (`id_status`) REFERENCES `statuses` (`id_status`);

INSERT INTO `roles` VALUES (1,'admin'),(2,'user'),(3,'guest');

INSERT INTO `statuses` VALUES (1,'process'),(2,'success'),(3,'error');

INSERT INTO `users` VALUES (1,'admin','foult080@gmail.com','$2b$10$mALUUQc32ipGgVCCkd9ipeoWIITUZpTaCyijS/Xd32bQh95zbmEqq',1,'2023-08-29 07:29:17');
