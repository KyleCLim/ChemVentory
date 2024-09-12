DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(400) NOT NULL,
  `accnt_type` int NOT NULL,
  `department` varchar(45) NOT NULL,
  `employee_id` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `users` WRITE;

INSERT INTO `users` VALUES (1,'ChemVentory','Administrator','Admin_01','admin@chemventory.com','$2a$10$bJmFYzGy3RwKes8wm77A6uBbvEqnP8/eA4vTusu43Q9fCGabWYxDm',1,'Lab_01','0012540','2024-08-30 18:48:39','2024-08-30 18:48:39');

UNLOCK TABLES;
