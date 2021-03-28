-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: student
-- ------------------------------------------------------
-- Server version	5.7.26-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_user`
--

DROP TABLE IF EXISTS `admin_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `username` (`username`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_user`
--

LOCK TABLES `admin_user` WRITE;
/*!40000 ALTER TABLE `admin_user` DISABLE KEYS */;
INSERT INTO `admin_user` VALUES (1,'admin','12345','admin','admin','https://image.yangxiansheng.top/img/50530061-851b-4ca5-9dc5-2fead928a939.jpg?imagelist');
/*!40000 ALTER TABLE `admin_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `cno` int(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `credit` int(20) DEFAULT NULL,
  `term` varchar(255) DEFAULT NULL,
  `period` int(20) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,1,'小程序',3,'第一学期',32,'https://lc-gold-cdn.xitu.io/a1e7773920f51db40441.png'),(2,2,'大学生心理健康',3,'第一学期',32,'https://image.yangxiansheng.top/img/20200608204915.png?imagelist'),(3,3,'大学物理',3,'第一学期',32,'https://image.yangxiansheng.top/img/20200608204841.png?imagelist'),(4,4,'中后台开发',3,'第一学期',32,'https://image.yangxiansheng.top/img/20200608204935.png?imagelist'),(5,5,'docker',3,'第一学期',32,'https://lc-gold-cdn.xitu.io/1265c034d36735225ac5.png'),(6,6,'Android',8,'第二学期',40,'https://lc-gold-cdn.xitu.io/7bab0e1e66ea386e6f94.png'),(7,7,'js',7,'第一学期',60,'https://lc-gold-cdn.xitu.io/5d70fd6af940df373834.png'),(8,8,'Github',8,'第二学期',80,'https://lc-gold-cdn.xitu.io/0d614af263aa63aa6a77.png'),(9,9,'架构',4,'第一学期',60,'https://lc-gold-cdn.xitu.io/f27d811ad7e2b2a0bc24.png'),(10,10,'APP',4,'第一学期',50,'https://user-gold-cdn.xitu.io/156111671895271a0c5950749e99824ce5c86a773064b.jpg'),(11,11,'Angular',8,'第一学期',20,'https://lc-gold-cdn.xitu.io/0cfb4955c418e67c273a.png'),(12,12,'产品经理',2,'第一学期',30,'https://lc-gold-cdn.xitu.io/c763e6bb7d3443d2b2ae.png'),(13,13,'Mac',4,'第一学期',40,'https://user-gold-cdn.xitu.io/1561117161612efe497906931679528191f1bf213c9b6.jpg'),(14,14,'大物',22,'第二学期',3,'https://user-gold-cdn.xitu.io/1561117161612efe497906931679528191f1bf213c9b6.jpg'),(15,15,'Android',4,'第二学期',40,'https://lc-gold-cdn.xitu.io/7bab0e1e66ea386e6f94.png');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_class`
--

DROP TABLE IF EXISTS `student_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_class` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `sno` int(20) DEFAULT NULL,
  `cno` int(20) DEFAULT NULL,
  `score` int(20) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_class`
--

LOCK TABLES `student_class` WRITE;
/*!40000 ALTER TABLE `student_class` DISABLE KEYS */;
INSERT INTO `student_class` VALUES (1,1,1,88),(73,1,2,55),(74,1,5,89),(75,1,6,99),(76,1,7,45),(77,1604905715,1,77),(78,1604905715,4,99),(79,1604906538,1,65),(80,1606906182,3,88),(81,1606906182,5,88),(82,1604905715,11,43),(84,1604905715,7,88),(85,1606906182,12,99),(86,1611043602,4,88);
/*!40000 ALTER TABLE `student_class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_user`
--

DROP TABLE IF EXISTS `student_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_user` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `sno` int(20) DEFAULT NULL COMMENT '学号',
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` int(20) DEFAULT NULL,
  `college` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_user`
--

LOCK TABLES `student_user` WRITE;
/*!40000 ALTER TABLE `student_user` DISABLE KEYS */;
INSERT INTO `student_user` VALUES (1,1,'杨志豪','251205668@qq.com','123456',0,'机械学院','语文','15879082927','北京','https://image.yangxiansheng.top/img/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg?imagelist'),(2,1604905715,'句号','111@qq.com','123456',1,'艺术学院','英语','15879082927','南昌','https://image.yangxiansheng.top/img/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg?imagelist'),(3,1604906538,'PDD','test@sina.com','990918',0,'计算机学院','机械工程','15879082927','南昌','https://image.yangxiansheng.top/img/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg?imagelist'),(4,1606906182,'yctc','test123@qq.com','wohenpi',0,'理学院','计算机技术与科学','13552814468','2','https://image.yangxiansheng.top/img/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg?imagelist'),(5,1606980078,'tc','www.mr.prince@qq.com','12345',0,'软件学院','软件工程','15524270856','沈阳','https://image.yangxiansheng.top/img/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg?imagelist'),(6,1608542021,'student01','13012347890@163.com','student01',0,'软件学院','软件工程','13012347890','中国','https://image.yangxiansheng.top/img/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg?imagelist'),(52,161104360,'test1','123@test.com','wohenpi',0,'艺术学院','语文','15879082927','宇宙','https://image.yangxiansheng.top/img/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg?imagelist'),(53,1611043602,'test1','123@test.com','wohenpi',1,'艺术学院','语文','15879082927','宇宙','https://image.yangxiansheng.top/img/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg?imagelist'),(54,1611043603,'test1','123@test.com','wohenpi',0,'艺术学院','语文','15879082927','宇宙','https://image.yangxiansheng.top/img/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg?imagelist'),(55,1611043604,'test1','123@test.com','wohenpi',0,'艺术学院','语文','15879082927','宇宙','https://image.yangxiansheng.top/img/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg?imagelist'),(56,1611043605,'test1','123@test.com','wohenpi',0,'艺术学院','语文','15879082927','宇宙','https://image.yangxiansheng.top/img/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg?imagelist'),(57,1611043606,'test1','123@test.com','wohenpi',0,'艺术学院','语文','15879082927','宇宙','https://image.yangxiansheng.top/img/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg?imagelist'),(58,1611043607,'test1','123@test.com','wohenpi',0,'艺术学院','语文','15879082927','宇宙','https://image.yangxiansheng.top/img/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg?imagelist'),(59,1611043608,'test1','123@test.com','wohenpi',0,'艺术学院','语文','15879082927','宇宙','https://image.yangxiansheng.top/img/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg?imagelist');
/*!40000 ALTER TABLE `student_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_user`
--

DROP TABLE IF EXISTS `teacher_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_user` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `tno` int(20) DEFAULT NULL COMMENT '工号',
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` int(20) DEFAULT NULL,
  `job` varchar(255) DEFAULT NULL,
  `cno` int(20) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `college` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_user`
--

LOCK TABLES `teacher_user` WRITE;
/*!40000 ALTER TABLE `teacher_user` DISABLE KEYS */;
INSERT INTO `teacher_user` VALUES (20,1604417819,'努力中的杨','12345678',1,'大学英语',3,'https://image.yangxiansheng.top/img/57ed425a-c71e-4201-9428-68760c0537c4.jpg?imagelist',NULL),(21,1604474053,'zzz123','12345',1,'大学英语',4,'https://image.yangxiansheng.top/img/57ed425a-c71e-4201-9428-68760c0537c4.jpg?imagelist','软件学院'),(22,1604902028,'南昌','990918',0,'中后台开发',10,'https://i.ibb.co/B3fVKN5/20200920212514.png','机械学院'),(23,1606982828,'天才大熊猫','12345',0,'产品经理',23,'https://image.yangxiansheng.top/img/57ed425a-c71e-4201-9428-68760c0537c4.jpg?imagelist','计算机学院');
/*!40000 ALTER TABLE `teacher_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-10 16:42:18
