# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.01 (MySQL 5.7.17)
# Database: bamazon_db
# Generation Time: 2017-02-01 16:29:35 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `item_id` int(10) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(50) NOT NULL,
  `department_name` varchar(50) NOT NULL,
  `price` float NOT NULL,
  `stock_quantity` int(10) NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;

INSERT INTO `products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES
	(1,'Harry Potter and the Globlet of Fire','Book',35,3),
	(2,'Container Direct Platform Bed','Home',1399,1),
	(3,'SKII Moisturizer Cream','Beauty',369,10),
	(4,'Evergreen Sewing Kit','Art & Craft',11.99,5),
	(5,'Lifeproof iPhone6 Case','Cell Phone & Accessories',79.99,120),
	(6,'HP ENVY 13-ab016nr Notebook','Computer & Accessorie',599.99,9),
	(7,'Fish Splash by Mark Mawson','Fine Art and Collectibles',1440,1),
	(8,'Samsonite Silhouette Xv','Luggage & Travel',166.33,5),
	(9,'Hills Scienc Diet Dry Dog Food','Pet',53.45,35),
	(10,'15\" Gems Stones Nacklace','Jewely',1299,2);

/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
