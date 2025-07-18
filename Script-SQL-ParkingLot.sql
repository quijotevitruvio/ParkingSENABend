-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 18-07-2025 a las 18:09:53
-- Versión del servidor: 8.0.40
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ParkingLot`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ACCESO_SALIDAS`
--

CREATE TABLE `ACCESO_SALIDAS` (
  `id` int NOT NULL,
  `movimiento` varchar(45) NOT NULL,
  `fecha_hora` datetime NOT NULL,
  `puerta` varchar(45) DEFAULT NULL,
  `tiempo_estadia` int DEFAULT NULL,
  `VEHICULO_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `ACCESO_SALIDAS`
--

INSERT INTO `ACCESO_SALIDAS` (`id`, `movimiento`, `fecha_hora`, `puerta`, `tiempo_estadia`, `VEHICULO_id`) VALUES
(2, 'Entrada', '2025-04-06 19:22:53', 'Puerta 1', 0, 1),
(3, 'Entrada', '2025-04-06 19:22:53', 'Puerta 2', 0, 2),
(4, 'Entrada', '2025-04-06 19:22:53', 'Puerta 3', 0, 3),
(5, 'Salida', '2025-04-06 19:22:53', 'Puerta 4', 560000, 4),
(6, 'Salida', '2025-04-06 19:22:53', 'Puerta 1', 0, 5),
(7, 'Entrada', '2025-04-06 19:22:53', 'Puerta 3', 0, 6),
(8, 'Entrada', '2025-04-06 19:22:53', 'Puerta 4', 0, 7),
(9, 'Entrada', '2025-04-06 19:22:53', 'Puerta 1', 0, 8),
(10, 'Salida', '2025-04-06 19:22:53', 'Puerta 1', 340000, 9),
(11, 'Salida', '2025-04-06 19:22:53', 'Puerta 1', 260000, 10),
(12, 'Entrada', '2025-04-06 19:22:53', 'Puerta 3', 0, 11),
(13, 'Entrada', '2025-04-06 19:22:53', 'Puerta 4', 0, 12),
(14, 'Entrada', '2025-04-06 19:22:53', 'Puerta 1', 0, 13),
(15, 'Salida', '2025-04-06 19:22:53', 'Puerta 1', 580000, 14),
(16, 'Entrada', '2025-04-06 19:22:53', 'Puerta 1', 0, 15),
(17, 'Entrada', '2025-04-06 19:22:53', 'Puerta 1', 0, 16),
(18, 'Entrada', '2025-04-06 19:22:53', 'Puerta 1', 0, 4),
(19, 'Salida', '2025-04-06 19:22:53', 'Puerta 1', 390000, 1),
(20, 'Entrada', '2025-04-06 19:22:53', 'Puerta 3', 0, 7),
(21, 'Salida', '2025-04-06 19:22:53', 'Puerta 4', 850000, 8),
(22, 'Entrada', '2025-04-06 19:22:53', 'Puerta 4', 0, 12),
(23, 'Salida', '2025-04-06 19:22:53', 'Puerta 4', 450000, 2),
(24, 'Entrada', '2025-04-06 19:22:53', 'Puerta 2', 0, 9),
(25, 'Salida', '2025-04-06 19:22:53', 'Puerta 2', 160000, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `CELDA`
--

CREATE TABLE `CELDA` (
  `id` int NOT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `CELDA`
--

INSERT INTO `CELDA` (`id`, `tipo`, `estado`) VALUES
(1, 'Carro', 'Libre'),
(2, 'Carro', 'Libre'),
(3, 'Carro', 'Libre'),
(4, 'Carro', 'Libre'),
(5, 'Carro', 'Libre'),
(6, 'Carro', 'Libre'),
(7, 'Carro', 'Libre'),
(8, 'Carro', 'Libre'),
(9, 'Carro', 'Libre'),
(10, 'Carro', 'Libre'),
(11, 'Carro', 'Libre'),
(12, 'Carro', 'Libre'),
(13, 'Carro', 'Libre'),
(14, 'Carro', 'Libre'),
(15, 'Carro', 'Libre'),
(16, 'Carro', 'Libre'),
(17, 'Carro', 'Libre'),
(18, 'Carro', 'Libre'),
(19, 'Carro', 'Libre'),
(20, 'Carro', 'Libre'),
(21, 'Carro', 'Libre'),
(22, 'Carro', 'Libre'),
(23, 'Carro', 'Libre'),
(24, 'Carro', 'Libre'),
(25, 'Carro', 'Libre'),
(26, 'Carro', 'Libre'),
(27, 'Carro', 'Libre'),
(28, 'Carro', 'Libre'),
(29, 'Carro', 'Libre'),
(30, 'Carro', 'Libre'),
(31, 'Carro', 'Libre'),
(32, 'Carro', 'Libre'),
(33, 'Carro', 'Libre'),
(34, 'Carro', 'Libre'),
(35, 'Carro', 'Libre'),
(36, 'Carro', 'Libre'),
(37, 'Carro', 'Libre'),
(38, 'Carro', 'Libre'),
(39, 'Carro', 'Libre'),
(40, 'Carro', 'Libre'),
(41, 'Carro', 'Libre'),
(42, 'Carro', 'Libre'),
(43, 'Carro', 'Libre'),
(44, 'Carro', 'Libre'),
(45, 'Carro', 'Libre'),
(46, 'Carro', 'Libre'),
(47, 'Carro', 'Libre'),
(48, 'Moto', 'Libre'),
(49, 'Moto', 'Libre'),
(50, 'Moto', 'Libre'),
(51, 'Moto', 'Libre'),
(52, 'Moto', 'Libre'),
(53, 'Moto', 'Libre'),
(54, 'Moto', 'Libre'),
(55, 'Moto', 'Libre'),
(56, 'Moto', 'Libre'),
(57, 'Moto', 'Libre'),
(58, 'Moto', 'Libre'),
(59, 'Moto', 'Libre'),
(60, 'Moto', 'Libre'),
(61, 'Moto', 'Libre'),
(62, 'Moto', 'Libre'),
(63, 'Moto', 'Libre'),
(64, 'Moto', 'Libre'),
(65, 'Moto', 'Libre'),
(66, 'Moto', 'Libre'),
(67, 'Moto', 'Libre'),
(68, 'Moto', 'Libre'),
(69, 'Moto', 'Libre'),
(70, 'Moto', 'Libre'),
(71, 'Moto', 'Libre'),
(72, 'Moto', 'Libre'),
(73, 'Moto', 'Libre'),
(74, 'Moto', 'Libre'),
(75, 'Moto', 'Libre'),
(76, 'Moto', 'Libre'),
(77, 'Moto', 'Libre'),
(78, 'Moto', 'Libre'),
(79, 'Moto', 'Libre'),
(80, 'Moto', 'Libre'),
(81, 'Moto', 'Libre'),
(82, 'Moto', 'Libre'),
(83, 'Moto', 'Libre'),
(84, 'Moto', 'Libre'),
(85, 'Moto', 'Libre'),
(86, 'Moto', 'Libre'),
(87, 'Moto', 'Libre');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `HISTORIAL_PARQUEO`
--

CREATE TABLE `HISTORIAL_PARQUEO` (
  `CELDA_id` int NOT NULL,
  `VEHICULO_id` int NOT NULL,
  `fecha_hora` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `HISTORIAL_PARQUEO`
--

INSERT INTO `HISTORIAL_PARQUEO` (`CELDA_id`, `VEHICULO_id`, `fecha_hora`) VALUES
(1, 1, '2025-04-06 19:22:53'),
(2, 2, '2025-04-06 19:22:53'),
(3, 3, '2025-04-06 19:22:53'),
(4, 4, '2025-04-06 19:22:53'),
(5, 5, '2025-04-06 19:22:53'),
(6, 6, '2025-04-06 19:22:53'),
(7, 7, '2025-04-06 19:22:53'),
(8, 8, '2025-04-06 19:22:53'),
(9, 9, '2025-04-06 19:22:53'),
(10, 10, '2025-04-06 19:22:53'),
(11, 11, '2025-04-06 19:22:53'),
(12, 12, '2025-04-06 19:22:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `INCIDENCIA`
--

CREATE TABLE `INCIDENCIA` (
  `id` int NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `INCIDENCIA`
--

INSERT INTO `INCIDENCIA` (`id`, `nombre`) VALUES
(1, 'Robo de vehiculo'),
(2, 'Robo de accesorios'),
(3, 'Robo de llaves'),
(4, 'Robo de documentos'),
(5, 'Robo de objetos personales'),
(6, 'Robo de dinero'),
(7, 'Robo de celular'),
(8, 'Robo de computador'),
(9, 'Robo de maletín'),
(10, 'choque'),
(11, 'vehiculo rayado'),
(12, 'atropellamiento de personas'),
(13, 'atropellamiento de animales');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PERFIL_USUARIO`
--

CREATE TABLE `PERFIL_USUARIO` (
  `id` int NOT NULL,
  `perfil` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `PERFIL_USUARIO`
--

INSERT INTO `PERFIL_USUARIO` (`id`, `perfil`) VALUES
(1, 'operador'),
(2, 'usuario'),
(3, 'administrador'),
(4, 'operador'),
(5, 'usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PICO_PLACA`
--

CREATE TABLE `PICO_PLACA` (
  `id` int NOT NULL,
  `tipo_vehiculo` varchar(45) DEFAULT NULL,
  `numero` varchar(45) DEFAULT NULL,
  `dia` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `PICO_PLACA`
--

INSERT INTO `PICO_PLACA` (`id`, `tipo_vehiculo`, `numero`, `dia`) VALUES
(1, 'Carro', '1', 'Lunes'),
(2, 'Carro', '2', 'Lunes'),
(3, 'Carro', '3', 'Martes'),
(4, 'Carro', '4', 'Martes'),
(5, 'Carro', '5', 'Miercoles'),
(6, 'Carro', '6', 'Miercoles'),
(7, 'Carro', '7', 'Jueves'),
(8, 'Carro', '8', 'Jueves'),
(9, 'Carro', '9', 'Viernes'),
(10, 'Carro', '0', 'Viernes'),
(11, 'Moto', '1', 'Lunes'),
(12, 'Moto', '2', 'Lunes'),
(13, 'Moto', '3', 'Martes'),
(14, 'Moto', '4', 'Martes'),
(15, 'Moto', '5', 'Miercoles'),
(16, 'Moto', '6', 'Miercoles'),
(17, 'Moto', '7', 'Jueves'),
(18, 'Moto', '8', 'Jueves'),
(19, 'Moto', '9', 'Viernes'),
(20, 'Moto', '0', 'Viernes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `REPORTE_INCIDENCIA`
--

CREATE TABLE `REPORTE_INCIDENCIA` (
  `VEHICULO_id` int NOT NULL,
  `INCIDENCIA_id` int NOT NULL,
  `fecha_hora` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `REPORTE_INCIDENCIA`
--

INSERT INTO `REPORTE_INCIDENCIA` (`VEHICULO_id`, `INCIDENCIA_id`, `fecha_hora`) VALUES
(1, 10, '2025-04-06 19:22:53'),
(2, 11, '2025-04-06 19:22:53'),
(3, 10, '2025-04-06 19:22:53'),
(10, 13, '2025-04-06 19:22:53'),
(12, 10, '2025-04-06 19:22:53'),
(15, 10, '2025-04-06 19:22:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `USUARIO`
--

CREATE TABLE `USUARIO` (
  `id_usuario` int NOT NULL,
  `tipo_documento` varchar(45) NOT NULL,
  `numero_documento` varchar(45) NOT NULL,
  `primer_nombre` varchar(255) NOT NULL,
  `segundo_nombre` varchar(225) DEFAULT NULL,
  `primer_apellido` varchar(255) NOT NULL,
  `segundo_apellido` varchar(45) DEFAULT NULL,
  `direccion_correo` varchar(255) NOT NULL,
  `numero_celular` varchar(45) NOT NULL,
  `foto_perfil` varchar(255) DEFAULT NULL,
  `estado` varchar(45) NOT NULL,
  `clave` varchar(255) DEFAULT NULL,
  `PERFIL_USUARIO_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `USUARIO`
--

INSERT INTO `USUARIO` (`id_usuario`, `tipo_documento`, `numero_documento`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `direccion_correo`, `numero_celular`, `foto_perfil`, `estado`, `clave`, `PERFIL_USUARIO_id`) VALUES
(2, 'CC', '8947676234', 'Ada', 'Alicia', 'Rivero', 'herrera', 'ada.rivero@gmail.com', '897484561', 'img/ada.jpg', 'activo', '3be76c0e963a343cd25f38dd92649ed2', 1),
(4, 'CC', '756876875', 'Carlos', 'Manuel', 'Uran', 'Menodza', 'carlos.uran@gmail.com', '7866856', 'img/carlos.jpg', 'activo', '3be76c0e963a343cd25f38dd92649ed2', 2),
(13, 'CC', '8764554', 'Lincho', 'De Jesus', 'Alvarez', 'Otero', 'lincho.alvarez@gmail.com', '1868445', 'img/lincho.jpg', 'activo', '3be76c0e963a343cd25f38dd92649ed2', 2),
(16, 'CC', '651684841', 'Abel', '', 'Rivero', 'Herrera', 'abel.rivero@gmail.com', '561465151', 'img/abel.jpg', 'activo', '3be76c0e963a343cd25f38dd92649ed2', 3),
(17, 'CC', '8947676234', 'Ada', 'Alicia', 'Rivero', 'herrera', 'ada.rivero@gmail.com', '897484561', 'img/ada.jpg', 'activo', '3be76c0e963a343cd25f38dd92649ed2', 1),
(18, 'CC', '8947676234', 'Martha', 'Paola', 'Perez', 'Ospino', 'martha.perez@gmail.com', '897484561', 'img/Martha.jpg', 'activo', '3be76c0e963a343cd25f38dd92649ed2', 3),
(19, 'CC', '756876875', 'Carlos', 'Manuel', 'Uran', 'Menodza', 'carlos.uran@gmail.com', '7866856', 'img/carlos.jpg', 'activo', '3be76c0e963a343cd25f38dd92649ed2', 2),
(20, 'CC', '756876875', 'Maria', 'Del Carmen', 'Herrera', 'Alian', 'maria.herrera@gmail.com', '56154118', 'img/maria.jpg', 'activo', '3be76c0e963a343cd25f38dd92649ed2', 3),
(21, 'CC', '894151', 'Peggy', 'Geraldine', 'Herrera', 'Alian', 'peggy.herrera@gmail.com', '8948484', 'img/peggy.jpg', 'activo', '3be76c0e963a343cd25f38dd92649ed2', 3),
(22, 'CC', '7894484644', 'Esteban', 'Solarte', 'Jaramillo', 'Alian', 'esteban.solarte@gmail.com', '4851855', 'img/esteban.jpg', 'activo', '3be76c0e963a343cd25f38dd92649ed2', 3),
(23, 'CC', '756876875', 'Maria', 'Del Carmen', 'Herrera', 'Alian', 'maria.herrera@gmail.com', '56154118', 'img/maria.jpg', 'activo', '3be76c0e963a343cd25f38dd92649ed2', 3),
(24, 'CC', '894151', 'Peggy', 'Geraldine', 'Herrera', 'Alian', 'peggy.herrera@gmail.com', '8948484', 'img/peggy.jpg', 'activo', '3be76c0e963a343cd25f38dd92649ed2', 3),
(25, 'CC', '7894484644', 'Esteban', 'Solarte', 'Jaramillo', 'Alian', 'esteban.solarte@gmail.com', '4851855', 'img/esteban.jpg', 'activo', '3be76c0e963a343cd25f38dd92649ed2', 3),
(26, 'CC', '23151486', 'Amparo', '', 'Grisales', 'Londoño', 'amaparo.grisales@gmail.com', '7894844', 'img/amparo.jpg', 'activo', '3be76c0e963a343cd25f38dd92649ed2', 3),
(27, 'CC', '6815158', 'Libardo', 'De Jesus', 'Atehortua', 'Grisales', 'libardo.atehortua@gmail.com', '12584181', 'img/libardo.jpg', 'activo', '3be76c0e963a343cd25f38dd92649ed2', 3),
(28, 'CC', '8764554', 'Lincho', 'De Jesus', 'Alvarez', 'Otero', 'lincho.alvarez@gmail.com', '1868445', 'img/lincho.jpg', 'activo', '3be76c0e963a343cd25f38dd92649ed2', 2),
(29, 'CC', '87897660', 'Melissa', '', 'Otero', 'Alvarez', 'mely.otero@gmail.com', '56615641468', 'img/melissa.jpg', 'activo', '3be76c0e963a343cd25f38dd92649ed2', 3),
(30, 'CC', '67865656', 'Miguel', '', 'Shinoda', 'Goku', 'mike.shindoa@gmail.com', '675574554', 'img/mike.jpg', 'activo', '3be76c0e963a343cd25f38dd92649ed2', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `VEHICULO`
--

CREATE TABLE `VEHICULO` (
  `id` int NOT NULL,
  `placa` varchar(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `modelo` varchar(45) DEFAULT NULL,
  `marca` varchar(45) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `USUARIO_id_usuario` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `VEHICULO`
--

INSERT INTO `VEHICULO` (`id`, `placa`, `color`, `modelo`, `marca`, `tipo`, `USUARIO_id_usuario`) VALUES
(2, 'GHT124', 'azul', '2011', 'Chevrolet', 'Carro', 2),
(4, 'ABC126', 'mate negro', '2020', 'Nissan', 'Carro', 4),
(16, 'DEV135', 'violeta neón', '2020', 'Chevrolet', 'Carro', 13),
(19, 'ABC126', 'mate negro', '2020', 'Nissan', 'Carro', 4),
(26, 'NHA131', 'blanco  perla', '2020', 'Yamaha', 'Moto', 9),
(27, 'BMW13', 'Azul Cielo', '2020', 'Nissan', 'Carro', 9),
(28, 'NSA132', 'rojo sangre', '2020', 'Chevrolet', 'Carro', 10),
(29, 'CNN133', 'verde limon', '2020', 'Nissan', 'Carro', 11),
(30, 'EXE134', 'purpura atómico', '2020', 'Chevrolet', 'Carro', 12),
(31, 'ZIP136', 'rojo', '2020', 'Honda', 'Moto', 14),
(32, 'DEV135', 'violeta neón', '2020', 'Chevrolet', 'Carro', 13),
(33, 'GAY137', 'rojo', '2018', 'Toyota', 'Carro', 15),
(34, 'ORO138', 'rojo', '2015', 'AKT', 'Moto', 16);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ACCESO_SALIDAS`
--
ALTER TABLE `ACCESO_SALIDAS`
  ADD PRIMARY KEY (`id`,`VEHICULO_id`),
  ADD KEY `fk_ACCESO_SALIDAS_VEHICULO1_idx` (`VEHICULO_id`);

--
-- Indices de la tabla `CELDA`
--
ALTER TABLE `CELDA`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `HISTORIAL_PARQUEO`
--
ALTER TABLE `HISTORIAL_PARQUEO`
  ADD PRIMARY KEY (`CELDA_id`,`VEHICULO_id`),
  ADD KEY `fk_CELDA_has_VEHICULO_VEHICULO1_idx` (`VEHICULO_id`),
  ADD KEY `fk_CELDA_has_VEHICULO_CELDA1_idx` (`CELDA_id`);

--
-- Indices de la tabla `INCIDENCIA`
--
ALTER TABLE `INCIDENCIA`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `PERFIL_USUARIO`
--
ALTER TABLE `PERFIL_USUARIO`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `PICO_PLACA`
--
ALTER TABLE `PICO_PLACA`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `REPORTE_INCIDENCIA`
--
ALTER TABLE `REPORTE_INCIDENCIA`
  ADD PRIMARY KEY (`VEHICULO_id`,`INCIDENCIA_id`),
  ADD KEY `fk_VEHICULO_has_INCIDENCIA_INCIDENCIA1_idx` (`INCIDENCIA_id`),
  ADD KEY `fk_VEHICULO_has_INCIDENCIA_VEHICULO1_idx` (`VEHICULO_id`);

--
-- Indices de la tabla `USUARIO`
--
ALTER TABLE `USUARIO`
  ADD PRIMARY KEY (`id_usuario`,`PERFIL_USUARIO_id`),
  ADD KEY `fk_USUARIO_PERFIL_USUARIO_idx` (`PERFIL_USUARIO_id`);

--
-- Indices de la tabla `VEHICULO`
--
ALTER TABLE `VEHICULO`
  ADD PRIMARY KEY (`id`,`USUARIO_id_usuario`),
  ADD KEY `fk_VEHICULO_USUARIO1_idx` (`USUARIO_id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ACCESO_SALIDAS`
--
ALTER TABLE `ACCESO_SALIDAS`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `CELDA`
--
ALTER TABLE `CELDA`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT de la tabla `INCIDENCIA`
--
ALTER TABLE `INCIDENCIA`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `PERFIL_USUARIO`
--
ALTER TABLE `PERFIL_USUARIO`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `PICO_PLACA`
--
ALTER TABLE `PICO_PLACA`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `USUARIO`
--
ALTER TABLE `USUARIO`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `VEHICULO`
--
ALTER TABLE `VEHICULO`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ACCESO_SALIDAS`
--
ALTER TABLE `ACCESO_SALIDAS`
  ADD CONSTRAINT `fk_ACCESO_SALIDAS_VEHICULO1` FOREIGN KEY (`VEHICULO_id`) REFERENCES `VEHICULO` (`id`);

--
-- Filtros para la tabla `HISTORIAL_PARQUEO`
--
ALTER TABLE `HISTORIAL_PARQUEO`
  ADD CONSTRAINT `fk_CELDA_has_VEHICULO_CELDA1` FOREIGN KEY (`CELDA_id`) REFERENCES `CELDA` (`id`),
  ADD CONSTRAINT `fk_CELDA_has_VEHICULO_VEHICULO1` FOREIGN KEY (`VEHICULO_id`) REFERENCES `VEHICULO` (`id`);

--
-- Filtros para la tabla `REPORTE_INCIDENCIA`
--
ALTER TABLE `REPORTE_INCIDENCIA`
  ADD CONSTRAINT `fk_VEHICULO_has_INCIDENCIA_INCIDENCIA1` FOREIGN KEY (`INCIDENCIA_id`) REFERENCES `INCIDENCIA` (`id`),
  ADD CONSTRAINT `fk_VEHICULO_has_INCIDENCIA_VEHICULO1` FOREIGN KEY (`VEHICULO_id`) REFERENCES `VEHICULO` (`id`);

--
-- Filtros para la tabla `USUARIO`
--
ALTER TABLE `USUARIO`
  ADD CONSTRAINT `fk_USUARIO_PERFIL_USUARIO` FOREIGN KEY (`PERFIL_USUARIO_id`) REFERENCES `PERFIL_USUARIO` (`id`);

--
-- Filtros para la tabla `VEHICULO`
--
ALTER TABLE `VEHICULO`
  ADD CONSTRAINT `fk_VEHICULO_USUARIO1` FOREIGN KEY (`USUARIO_id_usuario`) REFERENCES `USUARIO` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
