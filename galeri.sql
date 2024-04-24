-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2024 at 05:35 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `galeri`
--

-- --------------------------------------------------------

--
-- Table structure for table `foto`
--

CREATE TABLE `foto` (
  `id` int(11) NOT NULL,
  `judul_foto` varchar(255) NOT NULL,
  `deskripsi_foto` text NOT NULL,
  `tanggal_unggah` date NOT NULL,
  `lokasi_file` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `foto`
--

INSERT INTO `foto` (`id`, `judul_foto`, `deskripsi_foto`, `tanggal_unggah`, `lokasi_file`, `user_id`) VALUES
(2, 'Pemandangan terbaik 2015', '2015 moment haha haha montage nya wuhu', '2024-04-22', '1713773268334_bruh.bruh.jpg', 2),
(3, '3242342', 'WWAAAAAAAAAAAAAAAAAAAAA', '2024-04-22', '1713775804363_bruh.bruh.jpg', 2),
(4, 'kolam renang moment', 'kolam renang moment', '2024-04-22', '1713775825599_bruh.bruh.jpg', 2),
(6, 'a', 'a', '2024-04-22', '1713775880173_bruh.bruh.jpg', 2),
(7, 'a', 'a', '2024-04-22', '1713776063165_bruh.bruh.jpg', 2),
(8, 'a', 'a', '2024-04-22', '1713776067120_bruh.bruh.jpg', 2),
(9, 'a', 'a', '2024-04-22', '1713776071352_bruh.bruh.jpg', 2),
(10, 'a', 'a', '2024-04-22', '1713776074647_bruh.bruh.jpg', 2),
(11, 'a', 'a', '2024-04-22', '1713776077224_bruh.bruh.jpg', 2),
(12, 'w', 'w', '2024-04-22', '1713776402872_bruh.bruh.jpg', 2),
(14, 'Me and My Family ???????????? #bruhmoments #wow', 'Acara lebaran 2024 be like l', '2024-04-23', '1713844499473_john.doe.jpg', 1),
(15, '????', 'waw', '2024-04-23', '1713844559870_john.doe.jpg', 1),
(16, '????????', 'waw', '2024-04-23', '1713844800514_john.doe.jpg', 1),
(17, 'Sepak bola tersedih bangets', 'sedihnya 2024', '2024-04-23', '1713859708183_johnny.doedolyu.jpg', 5),
(18, 'jembtan serem', 'jembatan hantu', '2024-04-24', '1713918738956_bruh.bruhi.jpg', 2),
(19, 'Me dan teman-teman latihan lari dari kenyataan', 'hahaha hahaha hahahahahahahahahahahaahhahahahahaha', '2024-04-24', '1713925954175_johnny.doedolyu.jpg', 5),
(20, 'Belajar bersama 🙌🙌🙌', 'hahaha hahaha hahahahahahahahahahahaahhahahahahaha', '2024-04-24', '1713925972809_johnny.doedolyu.jpg', 5),
(21, 'keluargaku yang bahagaie 🤣🤣🤣😘😘😘', 'keluargaku yang bahagaie', '2024-04-24', '1713926556607_johnny.doedolyu.jpg', 5),
(22, 'selfie bersama anakku 😘😘', 'wow wow', '2024-04-24', '1713927063587_bruh.bruhi.jpg', 2);

-- --------------------------------------------------------

--
-- Table structure for table `komentar_foto`
--

CREATE TABLE `komentar_foto` (
  `id` int(11) NOT NULL,
  `foto_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `isi_komentar` text NOT NULL,
  `tanggal_komentar` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `komentar_foto`
--

INSERT INTO `komentar_foto` (`id`, `foto_id`, `user_id`, `isi_komentar`, `tanggal_komentar`) VALUES
(17, 15, 1, ' momjojo9iwawa', '2024-04-23'),
(26, 8, 5, 'aaaaw', '2024-04-23'),
(27, 8, 5, 'aaaawwwawa', '2024-04-23'),
(28, 8, 5, 'poolis', '2024-04-23'),
(29, 14, 5, 'aaa', '2024-04-23'),
(30, 12, 5, 'bruh moment', '2024-04-23'),
(32, 17, 5, 'wowghghhu', '2024-04-24'),
(33, 8, 5, 'wa', '2024-04-24'),
(34, 8, 5, 'wawawa', '2024-04-24'),
(35, 8, 5, 'wawawaawaw', '2024-04-24'),
(36, 8, 5, 'jyjyjy', '2024-04-24'),
(37, 8, 5, 'gjhgj', '2024-04-24'),
(38, 8, 5, 'wawawaw', '2024-04-24'),
(39, 8, 5, 'fghfghgfh', '2024-04-24'),
(40, 8, 5, 'gffhfgh', '2024-04-24'),
(41, 8, 5, 'ghjghjghj', '2024-04-24'),
(43, 18, 5, 'qqqfff', '2024-04-24'),
(44, 18, 5, 'wowwew', '2024-04-24'),
(46, 19, 2, 'wow', '2024-04-24'),
(47, 19, 2, 'keren kak', '2024-04-24'),
(48, 19, 2, 'euy', '2024-04-24'),
(49, 19, 2, 'a', '2024-04-24'),
(50, 19, 2, 'aa', '2024-04-24'),
(51, 19, 2, 'aaa', '2024-04-24'),
(52, 19, 2, 'aaaa', '2024-04-24'),
(53, 19, 2, 'aaaa', '2024-04-24'),
(54, 19, 2, 'aaaa', '2024-04-24'),
(55, 19, 2, 'aaaa', '2024-04-24'),
(56, 19, 2, 'aaaa', '2024-04-24'),
(57, 19, 2, 'aaaaa', '2024-04-24'),
(58, 19, 2, 'aaaaaa', '2024-04-24'),
(59, 19, 2, 'aaaaaaaa', '2024-04-24'),
(60, 18, 5, 'JELEK IH 🤮🤮🤮🤮🤮🤮🤮', '2024-04-24'),
(61, 18, 5, 'JELEK IH 🤮🤮🤮🤮🤮🤮🤮', '2024-04-24'),
(62, 18, 5, 'JELEK IH 🤮🤮🤮🤮🤮🤮🤮', '2024-04-24'),
(63, 18, 5, 'JELEK IH 🤮🤮🤮🤮🤮🤮🤮', '2024-04-24'),
(64, 18, 5, 'JELEK IH 🤮🤮🤮🤮🤮🤮🤮', '2024-04-24'),
(65, 18, 5, 'JELEK IH 🤮🤮🤮🤮🤮🤮🤮', '2024-04-24'),
(66, 18, 5, 'JELEK IH 🤮🤮🤮🤮🤮🤮🤮', '2024-04-24'),
(67, 18, 5, 'JELEK IH 🤮🤮🤮🤮🤮🤮🤮', '2024-04-24'),
(68, 18, 5, 'JELEK IH 🤮🤮🤮🤮🤮🤮🤮', '2024-04-24'),
(69, 18, 5, 'JELEK IH 🤮🤮🤮🤮🤮🤮🤮', '2024-04-24'),
(70, 18, 5, 'JELEK IH 🤮🤮🤮🤮🤮🤮🤮', '2024-04-24'),
(71, 18, 5, 'JELEK IH 🤮🤮🤮🤮🤮🤮🤮', '2024-04-24'),
(72, 18, 5, 'JELEK IH 🤮🤮🤮🤮🤮🤮🤮', '2024-04-24'),
(73, 18, 5, 'JELEK IH 🤮🤮🤮🤮🤮🤮🤮', '2024-04-24'),
(74, 18, 5, 'JELEK IH 🤮🤮🤮🤮🤮🤮🤮', '2024-04-24'),
(75, 18, 5, 'JELEK IH 🤮🤮🤮🤮🤮🤮🤮', '2024-04-24'),
(77, 18, 6, 'wow', '2024-04-24');

-- --------------------------------------------------------

--
-- Table structure for table `like_foto`
--

CREATE TABLE `like_foto` (
  `id` int(11) NOT NULL,
  `foto_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tanggal_like` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `like_foto`
--

INSERT INTO `like_foto` (`id`, `foto_id`, `user_id`, `tanggal_like`) VALUES
(7, 2, 2, '2024-04-22'),
(8, 8, 2, '2024-04-22'),
(9, 9, 2, '2024-04-22'),
(10, 4, 1, '2024-04-23'),
(11, 9, 1, '2024-04-23'),
(15, 2, 1, '2024-04-23'),
(25, 16, 1, '2024-04-23'),
(26, 6, 1, '2024-04-23'),
(27, 14, 1, '2024-04-23'),
(28, 8, 5, '2024-04-23'),
(36, 2, 5, '2024-04-23'),
(37, 14, 5, '2024-04-23'),
(39, 17, 5, '2024-04-23'),
(42, 18, 5, '2024-04-24'),
(45, 19, 5, '2024-04-24'),
(47, 18, 6, '2024-04-24');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `alamat` text NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `nama_lengkap`, `alamat`, `password`) VALUES
(1, 'arif.imtr', 'john@doe', 'John Doedolbruh', 'Jakarta, Indonesia', '$2b$10$I5ECTIqfL4ilg/eHmiiIKOJ0zcsN51j0aj5y0UFlHFllYyku6ml7m'),
(2, 'bruh.bruhi', 'bruh@bruh.com', 'Bruh Bruh', 'Majalengka, Indonesia', '$2b$10$q2.I2AqdNsfQPoCrL9XIP.7c4rLf1Yf3JumPv9YjQPF0YPa289F3C'),
(3, 'arif.imayu', 'arif@gmail.com', 'Arif Imam Arwana', 'Majalengka, Indonesia', '$2b$10$/HJhrJWogNG1Blh5Zvrcmug9Mis1U7UA5oX/fK0Eqiq2EtlfTHfhS'),
(4, 'john.d', 'john2@doe.com', 'Bruh Bruh', 'Majalengka, Indonesia', '$2b$10$dl9feXn1DWMQp7cnz08kA.OWw6lHMBGNRR6bQ3LpOPqIqrpaIZjTK'),
(5, 'johnny.doedolyu', 'johnny@doe.com', 'Johnny Doedol WAW WAWjua', 'Majalengka, Indonesiawaw', '$2b$10$kdEUNTokBPwUt4LY0oqguOdbhDccW./eqgwg5tLNZPDWl3yf6RnPW'),
(6, 'arkan.r.n', 'arkan@rn.com', 'Arkan RN', 'Indonesia', '$2b$10$IdggyJf0oXfBrIjiHpRxTujDUi.FZD4JSrhOWJ.vWJT8aw2/A.ONi');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `foto`
--
ALTER TABLE `foto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foto_user` (`user_id`);

--
-- Indexes for table `komentar_foto`
--
ALTER TABLE `komentar_foto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `komentarFoto_foto` (`foto_id`),
  ADD KEY `komentarFoto_user` (`user_id`);

--
-- Indexes for table `like_foto`
--
ALTER TABLE `like_foto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `likeFoto_foto` (`foto_id`),
  ADD KEY `likeFoto_user` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `foto`
--
ALTER TABLE `foto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `komentar_foto`
--
ALTER TABLE `komentar_foto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `like_foto`
--
ALTER TABLE `like_foto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `foto`
--
ALTER TABLE `foto`
  ADD CONSTRAINT `foto_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `komentar_foto`
--
ALTER TABLE `komentar_foto`
  ADD CONSTRAINT `komentarFoto_foto` FOREIGN KEY (`foto_id`) REFERENCES `foto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `komentarFoto_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `like_foto`
--
ALTER TABLE `like_foto`
  ADD CONSTRAINT `likeFoto_foto` FOREIGN KEY (`foto_id`) REFERENCES `foto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likeFoto_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
