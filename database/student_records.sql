-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 10 Des 2024 pada 12.08
-- Versi server: 10.4.22-MariaDB
-- Versi PHP: 8.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student_records`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `logbook`
--

CREATE TABLE `logbook` (
  `id` int(11) NOT NULL,
  `no` int(11) NOT NULL,
  `tanggal` date NOT NULL,
  `uraian_projek` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `logbook`
--

INSERT INTO `logbook` (`id`, `no`, `tanggal`, `uraian_projek`, `status`, `user_id`) VALUES
(7, 1, '2024-10-23', 'tampilan', 'Ongoing', 0),
(8, 2, '2024-10-28', 'tampilan', 'revisi', 0),
(10, 3, '2024-10-23', 'tampilan', 'Selesai', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `nim` varchar(50) NOT NULL,
  `universitas` varchar(100) NOT NULL,
  `noHpEmail` varchar(100) NOT NULL,
  `kelompok` varchar(50) DEFAULT NULL,
  `proyek` varchar(100) DEFAULT NULL,
  `github` varchar(100) DEFAULT NULL,
  `tanggal_masuk` date DEFAULT NULL,
  `tanggal_keluar` date DEFAULT NULL,
  `penempatan` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `profiles`
--

INSERT INTO `profiles` (`id`, `name`, `nim`, `universitas`, `noHpEmail`, `kelompok`, `proyek`, `github`, `tanggal_masuk`, `tanggal_keluar`, `penempatan`) VALUES
(5, 'satria', '1231313', 'sdasdasdasd', '21313123', 'wqeqweqwe', 'wsdwqd', 'wqdqwdqw', '2024-10-02', '2024-11-02', 'dwqdqwd');

-- --------------------------------------------------------

--
-- Struktur dari tabel `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `nim` varchar(15) NOT NULL,
  `universitas` varchar(100) NOT NULL,
  `noHpEmail` varchar(100) NOT NULL,
  `kelompok` varchar(50) NOT NULL,
  `proyek` varchar(100) NOT NULL,
  `github` varchar(255) NOT NULL,
  `tanggalMasuk` date DEFAULT NULL,
  `tanggalKeluar` date DEFAULT NULL,
  `penempatan` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `students`
--

INSERT INTO `students` (`id`, `nama`, `nim`, `universitas`, `noHpEmail`, `kelompok`, `proyek`, `github`, `tanggalMasuk`, `tanggalKeluar`, `penempatan`) VALUES
(1, 'satria yusuf saputra', 'A11.2021.13940', 'dimana', '081225662637', 'web', 'web', 'http', '2024-10-01', '2024-10-02', 'pedurungan'),
(2, 'ivan', '11111111', 'udinus', '09899938388', 'nhbh', 'bhb', 'bihbh', '2024-10-17', '2024-10-23', 'jnj'),
(3, 'krisna', 'A11.2021.13940', 'udinus', '081225662637', 'ayam', 'web', 'http', '2024-10-09', '2024-11-01', 'pedurungan'),
(4, 'fakih', 'A11.2020.12345', 'Unimar', '0812345678', 'Kelompok Elang', 'Website Apasaja', 'http', '2024-10-09', '2024-11-09', 'pedurungan'),
(5, 'arya', 'A11.2020.14444', 'Stekom', '081225662637', 'adadeh', 'iyaitu', 'http', '2024-10-01', '2024-10-25', 'pedurungan'),
(6, 'John Doe', 'A11.2021.13940', 'udinus', '081225662637', 'ayam', 'Website Apasaja', 'http', '2024-10-03', '2024-11-02', 'pedurungan'),
(52, 'satria aja', 'A12.13940', 'Udinus', '00000000000', 'daun', 'Membuat website Magang', 'http', '2024-10-23', '2024-11-23', 'semarang'),
(53, 'Rafael', 'A13.13940', 'Undip', '00000000000', 'adadeh', 'Membuat Sesuatu', 'http', '2024-10-23', '2024-11-24', 'gayamsari'),
(54, 'Satriaaaaaa', 'A11.2021.16789', 'Udinus', '081225662637', 'webb', 'Website Apasaja', 'http', '2024-10-23', '2024-11-23', 'pedurungan'),
(55, 'ayam', 'A11.2020.12345', 'dimana', '081225662637', 'Kelompok Elang', 'Website Apasaja', 'http', '2024-10-23', '2024-11-23', 'gayamsari'),
(56, 'kalkun', 'asffsfasfs', 'fassafssfafsa', '441221124124', 'fsafaf', 'afsfsfsasaf', 'sfafsasfaf', '2024-10-22', '2024-10-25', 'esfewsfrewsf'),
(60, 'Krisna', 'A11.2020.14444', 'Stekom', '441221124124', 'adadeh', 'Website Apasaja', 'efewfewfewe', '2024-10-27', '2024-11-27', 'disini'),
(61, 'bebek', 'A11.2021.13940', 'Stekom', '081234567890', 'bebek', 'web', 'qwfwqffwqf', '2024-10-27', '2024-10-27', 'asffasfassfa'),
(62, 'rawr', 'A11.2021.13940', 'Undip', '0812345678', 'web', 'web', 'efssefesf', '2024-10-27', '2024-11-27', 'semarang'),
(63, 'ayam', 'A11.2021.13940', 'Unimar', '441221124124', 'web', 'Website Apasaja', 'rgergreg', '2024-10-27', '2024-11-07', 'disini'),
(64, 'ayam', 'A11.2020.14444', 'udinus', '00000000000', 'web', 'Website Apasaja', 'rgergreg', '2024-10-30', '2024-11-30', 'saefwafqawf');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profileCompleted` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `profileCompleted`, `created_at`, `updated_at`) VALUES
(1, 'satriasys2@gmail.com', '$2y$10$IPnUzSvMgvQ9yazaRL68Vul6ZAfDxhZWuMrXwf3Q79FjDQS8tNo6q', 1, '2024-10-23 12:06:32', '2024-10-23 12:25:55'),
(2, 'satria@gmail.com', '$2y$10$NBVNfztCM0rNogi/kMXcv.Cqs.TDq4GBnyk2havolSv.zRX8amom6', 0, '2024-10-23 12:30:54', '2024-10-27 07:36:01'),
(3, 'satria1@gmail.com', '$2y$10$ZZN4qGHeTO.BpOtPWpJaWONwvycvqM0EtCsZQFPIEQdT...46fZW.', 0, '2024-10-28 12:57:57', '2024-10-28 12:57:57'),
(4, 'satria@s', '$2y$10$CS8jit5ry0AyHeE8n2EjdejS4cbkT5muJjizBWb50HXjBnkpV0AQK', 0, '2024-10-30 03:55:02', '2024-10-30 03:55:02');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `logbook`
--
ALTER TABLE `logbook`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `logbook`
--
ALTER TABLE `logbook`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
