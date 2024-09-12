DROP TABLE IF EXISTS `inventory_items`;

CREATE TABLE `inventory_items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `chem_name` varchar(200) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `cas_num` varchar(45) DEFAULT NULL,
  `quantity` decimal(10,4) NOT NULL,
  `unit` varchar(10) NOT NULL,
  `batch_code` varchar(45) NOT NULL,
  `location` varchar(45) NOT NULL,
  `supplier` varchar(100) DEFAULT NULL,
  `local_code` varchar(15) DEFAULT NULL,
  `note` text,
  `isfavorite` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `facility_id` varchar(45) DEFAULT NULL,
  `mfg_date` datetime NOT NULL,
  `exp_date` datetime NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `inventory_items` WRITE;

INSERT INTO `inventory_items` VALUES (1,'hydrochloric acid','sharlau','7647-01-0',2400.0000,'mL','B240601','Cab-3','krypton','L-26','To be transferred to BUK Lab',1,1,'Lab_01','2024-08-01 00:00:00','2027-08-01 00:00:00','2024-08-31 22:50:51','2024-09-11 17:50:06'),(2,'nitric acid','sharlau','7697-37-2',5000.0000,'mL','B240527','Cab-3','krypton','L-24','',1,1,'Lab_01','2024-07-19 00:00:00','2027-07-19 00:00:00','2024-08-31 22:53:36','2024-09-11 17:50:08'),(5,'potassium permanganate','sharlau','7722-64-7',497.0000,'g','B101010','Cab-1','chemtropy','S-5','',0,1,'Lab_01','2024-09-01 00:00:00','2029-09-01 00:00:00','2024-09-01 18:17:07','2024-09-11 17:49:58'),(10,'sodium bicarbonate','merck','144-55-8',500.0000,'g','BXxxx','Cab-1','hichem trading','S-2','',0,1,'Lab_01','2024-09-03 00:00:00','2028-09-03 00:00:00','2024-09-03 15:15:20','2024-09-03 15:15:20'),(13,'sodium chloride','merck','7647-14-5',500.0000,'g','BXxxx','Cab-1','krypton','S-1','',0,1,'Lab_01','2024-09-03 00:00:00','2028-09-03 00:00:00','2024-09-03 15:37:50','2024-09-07 12:36:11'),(24,'copper(ii) sulphate','merck','7758-98-7',100000.0000,'g','BXxxx','Cab-3','hichem trading','S-5','',0,1,'Lab_01','2024-09-07 00:00:00','2028-09-07 00:00:00','2024-09-06 14:29:20','2024-09-07 22:23:56'),(25,'acetic acid','sharlau','64-19-7',3200.0000,'mL','BXxxx','Cab-3','hichem trading','L-10','',1,1,'Lab_01','2024-09-02 00:00:00','2024-09-30 00:00:00','2024-09-07 15:34:48','2024-09-12 16:10:54'),(36,'bbbb test chem','testing purpose','Xxxx',500.0000,'g','BXxxx','Cab-X','xxxx','X','',0,1,'Lab_01','2024-09-12 00:00:00','2024-09-29 00:00:00','2024-09-12 00:02:23','2024-09-12 14:45:18'),(37,'aa test chem','testing purpose','Xxxx',5000.0000,'g','BXxxx','Cab-X','xxxx','X','',0,8,'Lab_02','2024-09-12 00:00:00','2024-09-29 00:00:00','2024-09-12 16:18:22','2024-09-12 16:18:22');

UNLOCK TABLES;
