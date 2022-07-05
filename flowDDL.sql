-- banned extension table
CREATE TABLE flow.fw_ext_ban (
	SYS_ID varchar(32) PRIMARY KEY,
	SYS_FLAG varchar(1) NOT NULL,
	SYS_CREATE_DATE DATETIME NOT NULL,
	SYS_MODIFY_DATE DATETIME NOT NULL,
	FW_EXT_NAME varchar(10) NOT NULL,
	FK_USER_ID varchar(32) NULL	
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

-- checkbox data
CREATE TABLE flow.fw_ext_ban_fixed (
	`NAME` varchar(100) NOT NULL,
	`VALUE` varchar(1) NOT NULL,
	PRIMARY KEY (`NAME`)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8;


-- user table # (not use)
CREATE TABLE `fw_user` (
  `SYS_ID` varchar(32) NOT NULL,
  `SYS_FLAG` varchar(32) NOT NULL,
  `SYS_CREATE_DATE` datetime NOT NULL,
  `SYS_MODIFY_DATE` datetime NOT NULL,
  `USER_ID` varchar(20) DEFAULT NULL,
  `USER_NAME` varchar(50) NOT NULL,
  `USER_GENDER` varchar(1) DEFAULT NULL,
  `USER_BIRTHDAY` date DEFAULT NULL,
  `USER_PASSWORD` varchar(20) NOT NULL,
  PRIMARY KEY (`SYS_ID`),
  UNIQUE KEY `USER_ID` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


  
  