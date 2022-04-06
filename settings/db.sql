/* Candy Server Database Create Tables SQL */
/* for MySQL(MariaDB) */

CREATE TABLE `user` (
	`Uid` INT(11) NOT NULL AUTO_INCREMENT,
	`Id` VARCHAR(50) NOT NULL COLLATE 'utf8_general_ci',
	`Password` VARCHAR(150) NOT NULL COLLATE 'utf8_general_ci',
	`NickName` VARCHAR(50) NOT NULL COLLATE 'utf8_general_ci',
	/* 0: normal, 1: manager, 2: admin */
	`Permission` INT(11) NOT NULL,
	PRIMARY KEY (`Uid`) USING BTREE,
	FULLTEXT INDEX `Id` (`Id`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

CREATE TABLE `user-account-connection` (
  `Uid` INT(11) NOT NULL,
  `GoogleKey` VARCHAR(255) NOT NULL COLLATE 'utf8_general_ci',
  `NaverKey` VARCHAR(255) NOT NULL COLLATE 'utf8_general_ci',
  `KakaoKey` VARCHAR(255) NOT NULL COLLATE 'utf8_general_ci',
  `AppleKey` VARCHAR(255) NOT NULL COLLATE 'utf8_general_ci',
	CONSTRAINT `Uid` FOREIGN KEY (`Uid`) REFERENCES `candy`.`user` (`Uid`) ON UPDATE RESTRICT ON DELETE RESTRICT,
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

CREATE TABLE `user-credit-card` (

)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;