# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.01 (MySQL 5.7.17)
# Database: bamazon_db
# Generation Time: 2017-02-04 00:12:31 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table departments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `departments`;

CREATE TABLE `departments` (
  `department_id` int(10) NOT NULL AUTO_INCREMENT,
  `department_name` varchar(50) NOT NULL,
  `over_head_costs` float NOT NULL,
  `total_sales` float NOT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;

INSERT INTO `departments` (`department_id`, `department_name`, `over_head_costs`, `total_sales`)
VALUES
	(1,'Book',5000,5539),
	(2,'Home',37000,45000),
	(3,'Beauty',28000,35000),
	(4,'Art & Craft',12000,8000),
	(5,'Cell Phone & Accessories',65000,92000),
	(6,'Computer & Accessorie',23000,45000),
	(7,'Fine Art and Collectibles',35000,12000),
	(8,'Luggage & Travel',7300,7600),
	(9,'Pet',54000,6500),
	(10,'Shoe',43000,38000),
	(11,'Jewely',26000,13000);

/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
