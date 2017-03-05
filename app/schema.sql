-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.7.17-log - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出  表 amblog.articles 结构
DROP TABLE IF EXISTS `articles`;
CREATE TABLE IF NOT EXISTS `articles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'post表主键',
  `title` varchar(200) DEFAULT NULL COMMENT '文章标题',
  `slug` varchar(200) DEFAULT NULL COMMENT '文章缩略名',
  `created` datetime DEFAULT NULL COMMENT '文章生成时的时间',
  `modified` datetime DEFAULT NULL COMMENT '文章更改时的时间',
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `created` (`created`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='文章表';

-- 正在导出表  amblog.articles 的数据：0 rows
DELETE FROM `articles`;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` (`id`, `title`, `slug`, `created`, `modified`, `content`, `author_id`, `type`, `status`, `tags`, `categories`, `hits`, `comments_num`, `allow_comment`, `allow_ping`, `allow_feed`) VALUES
	(1, 'Hello world', '', '2017-03-05 13:52:28', '2017-03-05 13:52:28', '### Hello world!', 0, 'post', 'publish', NULL, NULL, 0, 0, 1, 1, 1);
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;

-- 导出  表 amblog.site 结构
DROP TABLE IF EXISTS `site`;
CREATE TABLE IF NOT EXISTS `site` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL COMMENT '网站名称',
  `email` varchar(200) DEFAULT NULL COMMENT '用户邮箱',
  `password` varchar(64) DEFAULT NULL COMMENT '用户密码',
  `about` varchar(200) DEFAULT NULL,
  `sub_name` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*!40000 ALTER TABLE `site` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
