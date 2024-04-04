-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: schema_1
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `election`
--

DROP TABLE IF EXISTS `election`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `election` (
  `ElectionID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  `Description` varchar(45) DEFAULT NULL,
  `ElectionCode` varchar(45) DEFAULT NULL,
  `StartTime` varchar(45) DEFAULT NULL,
  `EndTime` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ElectionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `election`
--

LOCK TABLES `election` WRITE;
/*!40000 ALTER TABLE `election` DISABLE KEYS */;
/*!40000 ALTER TABLE `election` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `electioncreationevent`
--

DROP TABLE IF EXISTS `electioncreationevent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `electioncreationevent` (
  `ElectionCreationID` int NOT NULL AUTO_INCREMENT,
  `CreationTime` varchar(45) DEFAULT NULL,
  `ElectionID` int DEFAULT NULL,
  PRIMARY KEY (`ElectionCreationID`),
  KEY `ElectionID` (`ElectionID`),
  CONSTRAINT `electioncreationevent_ibfk_1` FOREIGN KEY (`ElectionID`) REFERENCES `election` (`ElectionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `electioncreationevent`
--

LOCK TABLES `electioncreationevent` WRITE;
/*!40000 ALTER TABLE `electioncreationevent` DISABLE KEYS */;
/*!40000 ALTER TABLE `electioncreationevent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `electioncreator`
--

DROP TABLE IF EXISTS `electioncreator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `electioncreator` (
  `Email` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `electioncreator`
--

LOCK TABLES `electioncreator` WRITE;
/*!40000 ALTER TABLE `electioncreator` DISABLE KEYS */;
/*!40000 ALTER TABLE `electioncreator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emailverificationevent`
--

DROP TABLE IF EXISTS `emailverificationevent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emailverificationevent` (
  `VerificationID` int NOT NULL AUTO_INCREMENT,
  `VoterID` int DEFAULT NULL,
  `VerificationCode` varchar(45) DEFAULT NULL,
  `ExpirationTime` varchar(45) DEFAULT NULL,
  `Status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`VerificationID`),
  KEY `VoterID` (`VoterID`),
  CONSTRAINT `emailverificationevent_ibfk_1` FOREIGN KEY (`VoterID`) REFERENCES `voters` (`VoterID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emailverificationevent`
--

LOCK TABLES `emailverificationevent` WRITE;
/*!40000 ALTER TABLE `emailverificationevent` DISABLE KEYS */;
/*!40000 ALTER TABLE `emailverificationevent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nominees`
--

DROP TABLE IF EXISTS `nominees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nominees` (
  `Names` varchar(45) DEFAULT NULL,
  `position` varchar(45) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `NomineeID` int NOT NULL,
  PRIMARY KEY (`NomineeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nominees`
--

LOCK TABLES `nominees` WRITE;
/*!40000 ALTER TABLE `nominees` DISABLE KEYS */;
/*!40000 ALTER TABLE `nominees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participationevent`
--

DROP TABLE IF EXISTS `participationevent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participationevent` (
  `ParticipationID` int NOT NULL,
  `Status` varchar(45) DEFAULT NULL,
  `ElectionID` int NOT NULL,
  `NomineeID` int DEFAULT NULL,
  PRIMARY KEY (`ParticipationID`,`ElectionID`),
  KEY `ElectionID` (`ElectionID`),
  KEY `NomineeID` (`NomineeID`),
  CONSTRAINT `participationevent_ibfk_1` FOREIGN KEY (`ElectionID`) REFERENCES `election` (`ElectionID`),
  CONSTRAINT `participationevent_ibfk_2` FOREIGN KEY (`NomineeID`) REFERENCES `nominees` (`NomineeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participationevent`
--

LOCK TABLES `participationevent` WRITE;
/*!40000 ALTER TABLE `participationevent` DISABLE KEYS */;
/*!40000 ALTER TABLE `participationevent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voters`
--

DROP TABLE IF EXISTS `voters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voters` (
  `Verified_status` tinyint(1) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `VoterID` int NOT NULL,
  PRIMARY KEY (`VoterID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voters`
--

LOCK TABLES `voters` WRITE;
/*!40000 ALTER TABLE `voters` DISABLE KEYS */;
/*!40000 ALTER TABLE `voters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votes`
--

DROP TABLE IF EXISTS `votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votes` (
  `VoteID` int NOT NULL AUTO_INCREMENT,
  `VoterID` int DEFAULT NULL,
  `NomineeID` int DEFAULT NULL,
  `Timestamp` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`VoteID`),
  KEY `VoterID` (`VoterID`),
  KEY `NomineeID` (`NomineeID`),
  CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`VoterID`) REFERENCES `voters` (`VoterID`),
  CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`NomineeID`) REFERENCES `nominees` (`NomineeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votes`
--

LOCK TABLES `votes` WRITE;
/*!40000 ALTER TABLE `votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votingevent`
--

DROP TABLE IF EXISTS `votingevent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votingevent` (
  `VotingEventID` int NOT NULL,
  `Status` varchar(45) DEFAULT NULL,
  `EligibilityStatus` varchar(45) DEFAULT NULL,
  `ElectionID` int NOT NULL,
  `VoterID` int NOT NULL,
  PRIMARY KEY (`VotingEventID`,`ElectionID`,`VoterID`),
  KEY `ElectionID` (`ElectionID`),
  KEY `VoterID` (`VoterID`),
  CONSTRAINT `votingevent_ibfk_1` FOREIGN KEY (`ElectionID`) REFERENCES `election` (`ElectionID`),
  CONSTRAINT `votingevent_ibfk_2` FOREIGN KEY (`VoterID`) REFERENCES `voters` (`VoterID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votingevent`
--

LOCK TABLES `votingevent` WRITE;
/*!40000 ALTER TABLE `votingevent` DISABLE KEYS */;
/*!40000 ALTER TABLE `votingevent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'schema_1'
--

--
-- Dumping routines for database 'schema_1'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-04 23:44:13
