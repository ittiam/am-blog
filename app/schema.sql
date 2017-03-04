# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.14)
# Database: amblog
# Generation Time: 2017-03-04 22:34:43 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table articles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `articles`;

CREATE TABLE `articles` (
  `tid` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'post表主键',
  `title` varchar(200) DEFAULT NULL COMMENT '文章标题',
  `slug` varchar(200) DEFAULT NULL COMMENT '文章缩略名',
  `created` int(10) unsigned DEFAULT '0' COMMENT '文章生成时的GMT unix时间戳',
  `modified` int(10) unsigned DEFAULT '0' COMMENT '文章更改时的GMT unix时间戳',
  `content` text COMMENT '文章内容',
  `author_id` int(10) unsigned DEFAULT '0' COMMENT '文章所属用户id',
  `type` varchar(16) DEFAULT 'post' COMMENT '文章类别',
  `status` varchar(16) DEFAULT 'publish' COMMENT '文章状态',
  `tags` varchar(200) DEFAULT NULL COMMENT '标签列表',
  `categories` varchar(200) DEFAULT NULL COMMENT '分类列表',
  `hits` int(10) unsigned DEFAULT '0' COMMENT '点击次数',
  `comments_num` int(10) unsigned DEFAULT '0' COMMENT '内容所属评论数',
  `allow_comment` tinyint(1) DEFAULT '1' COMMENT '是否允许评论',
  `allow_ping` tinyint(1) DEFAULT '1' COMMENT '是否允许ping',
  `allow_feed` tinyint(1) DEFAULT '1' COMMENT '允许出现在聚合中',
  PRIMARY KEY (`tid`),
  UNIQUE KEY `slug` (`slug`),
  KEY `created` (`created`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='内容表';



# Dump of table site
# ------------------------------------------------------------

DROP TABLE IF EXISTS `site`;

CREATE TABLE `site` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL COMMENT '网站名称',
  `email` varchar(200) DEFAULT NULL COMMENT '用户邮箱',
  `password` varchar(64) DEFAULT NULL COMMENT '用户密码',
  `about` varchar(200) DEFAULT NULL,
  `sub_name` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
