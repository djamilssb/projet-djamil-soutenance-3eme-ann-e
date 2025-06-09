-- Base : kidstrotter
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
-- --------------------------------------------------------
-- Table: kt_avatar
-- --------------------------------------------------------
CREATE TABLE `kt_avatar` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `image_url` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------
-- Table: kt_organizations
-- --------------------------------------------------------
CREATE TABLE `kt_organizations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone_number` VARCHAR(20) DEFAULT NULL,
  `about_us` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_organization_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------
-- Table: kt_users
-- --------------------------------------------------------
CREATE TABLE `kt_users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_avatar` INT UNSIGNED NOT NULL,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `password_kids` VARCHAR(255) DEFAULT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(20) DEFAULT NULL,
  `address` VARCHAR(255) DEFAULT NULL,
  `role` VARCHAR(20) NOT NULL DEFAULT 'users',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_email` (`email`),
  CONSTRAINT `fk_user_avatar` FOREIGN KEY (`id_avatar`) REFERENCES `kt_avatar` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------
-- Table: kt_departements
-- --------------------------------------------------------
CREATE TABLE `kt_departements` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  `departement_number` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_departement_number` (`departement_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------
-- Table: kt_quizzes
-- --------------------------------------------------------
CREATE TABLE `kt_quizzes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_user` INT UNSIGNED DEFAULT NULL,
  `id_departement` INT UNSIGNED DEFAULT NULL,
  `title` VARCHAR(40) NOT NULL,
  `description` VARCHAR(155) NOT NULL DEFAULT 'No description',
  `is_custom` BOOLEAN NOT NULL DEFAULT FALSE,
  `nbr_question` INT NOT NULL DEFAULT 0,
  `is_active` INT NOT NULL DEFAULT 0,
  `image_url` TEXT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_quizz_user` FOREIGN KEY (`id_user`) REFERENCES `kt_users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_quizz_departement` FOREIGN KEY (`id_departement`) REFERENCES `kt_departements` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------
-- Table: kt_characters
-- --------------------------------------------------------
CREATE TABLE `kt_characters` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_quizz` INT UNSIGNED DEFAULT NULL,
  `name` VARCHAR(20) NOT NULL,
  `image_url` TEXT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_character_quizz` FOREIGN KEY (`id_quizz`) REFERENCES `kt_quizzes` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------
-- Table: kt_questions
-- --------------------------------------------------------
CREATE TABLE `kt_questions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_quizz` INT UNSIGNED NOT NULL,
  `order_index` INT NOT NULL,
  `is_dialog` BOOLEAN NOT NULL DEFAULT FALSE,
  `content` TEXT NOT NULL,
  `image_url` TEXT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_question_quizz` FOREIGN KEY (`id_quizz`) REFERENCES `kt_quizzes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------
-- Table: kt_answers
-- --------------------------------------------------------
CREATE TABLE `kt_answers` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_quizz` INT UNSIGNED NOT NULL,
  `id_question` INT UNSIGNED NOT NULL,
  `content` TEXT NOT NULL,
  `explication` TEXT NOT NULL,
  `is_correct` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_answer_quizz` FOREIGN KEY (`id_quizz`) REFERENCES `kt_quizzes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_answer_question` FOREIGN KEY (`id_question`) REFERENCES `kt_questions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------
-- Table: kt_quizz_users
-- --------------------------------------------------------
CREATE TABLE `kt_quizz_users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_quizz` INT UNSIGNED NOT NULL,
  `id_user` INT UNSIGNED DEFAULT NULL,
  `score` INT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_quizz_users_quizz` FOREIGN KEY (`id_quizz`) REFERENCES `kt_quizzes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_quizz_users_user` FOREIGN KEY (`id_user`) REFERENCES `kt_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;