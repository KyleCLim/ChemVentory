DROP TABLE IF EXISTS `account_type`;

CREATE TABLE `account_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(45) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `type_UNIQUE` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `account_type` WRITE;

INSERT INTO `account_type` VALUES (1,'Admin','2024-08-29 23:32:06','2024-08-29 23:32:06'),(2,'Regular','2024-08-29 23:32:07','2024-08-29 23:32:07');

UNLOCK TABLES;
