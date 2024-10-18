-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-10-2024 a las 03:35:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bienestar`
--

DELIMITER $$
--
-- Procedimientos
--

CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateFicha` (IN `p_numero` VARCHAR(255), IN `p_jornada` VARCHAR(255))   BEGIN
    INSERT INTO Fichas (numero, jornada, createdAt, updatedAt)
    VALUES (p_numero, p_jornada, NOW(), NOW());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateInstructor` (IN `p_usuarioId` INT, IN `p_es_gestor` BOOLEAN, IN `p_fichaId` INT)   BEGIN
    INSERT INTO Instructores (usuarioId, es_gestor, fichaId, createdAt, updatedAt)
    VALUES (p_usuarioId, p_es_gestor, p_fichaId, NOW(), NOW());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateIntegrante` (IN `p_area` VARCHAR(255), IN `p_usuarioId` INT, IN `p_liderId` INT)   BEGIN
    INSERT INTO Integrantes (area, usuarioId, liderId, createdAt, updatedAt)
    VALUES (p_area, p_usuarioId, p_liderId, NOW(), NOW());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateLiderBienestar` (IN `p_usuarioId` INT)   BEGIN
    INSERT INTO Lider_Bienestar (usuarioId, createdAt, updatedAt)
    VALUES (p_usuarioId, NOW(), NOW());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateRemision` (IN `p_estado` VARCHAR(255), IN `p_aprendizId` INT, IN `p_integranteId` INT)   BEGIN
    INSERT INTO Remisiones (estado, aprendizId, integranteId, createdAt, updatedAt)
    VALUES (p_estado, p_aprendizId, p_integranteId, NOW(), NOW());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateServicio` (IN `p_nombre` VARCHAR(255), IN `p_encargadoId` INT)   BEGIN
    INSERT INTO Servicios (nombre, encargadoId, createdAt, updatedAt)
    VALUES (p_nombre, p_encargadoId, NOW(), NOW());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateSolicitudRemision` (IN `p_area` VARCHAR(255), IN `p_aprendizId` INT, IN `p_integranteId` INT)   BEGIN
    INSERT INTO SolicitudRemisiones (area, aprendizId, integranteId, createdAt, updatedAt)
    VALUES (p_area, p_aprendizId, p_integranteId, NOW(), NOW());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateUsuario` (IN `p_nombre` VARCHAR(255), IN `p_apellido` VARCHAR(255), IN `p_documento` VARCHAR(255), IN `p_telefono` VARCHAR(255), IN `p_email` VARCHAR(255), IN `p_contrasena` VARCHAR(255))   BEGIN
    INSERT INTO Usuarios (nombre, apellido, documento, telefono, email, contrasena, createdAt, updatedAt)
    VALUES (p_nombre, p_apellido, p_documento, p_telefono, p_email, p_contrasena, NOW(), NOW());
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aprendices`
--

CREATE TABLE `aprendices` (
  `id` int(11) NOT NULL,
  `usuarioId` int(11) NOT NULL,
  `fichaId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fichas`
--

CREATE TABLE `fichas` (
  `id` int(11) NOT NULL,
  `numero` varchar(255) NOT NULL,
  `jornada` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instructores`
--

CREATE TABLE `instructores` (
  `id` int(11) NOT NULL,
  `usuarioId` int(11) NOT NULL,
  `es_gestor` tinyint(1) NOT NULL,
  `fichaId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `integrantes`
--

CREATE TABLE `integrantes` (
  `id` int(11) NOT NULL,
  `area` varchar(255) NOT NULL,
  `usuarioId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lider_bienestar`
--

CREATE TABLE `lider_bienestar` (
  `id` int(11) NOT NULL,
  `usuarioId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `remisiones`
--

CREATE TABLE `remisiones` (
  `id` int(11) NOT NULL,
  `estado` varchar(255) NOT NULL,
  `aprendizId` int(11) NOT NULL,
  `integranteId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20241018000457-create-usuario.js'),
('20241018002457-create-instructor.js'),
('20241018002624-add-associations-to-usuario.js'),
('20241018002936-create-ficha.js'),
('20241018003351-create-aprendiz.js'),
('20241018003446-create-lider-bienestar.js'),
('20241018003800-create-integrante.js'),
('20241018004159-create-remision.js'),
('20241018004256-create-solicitud-remision.js'),
('20241018010234-create-servicio.js');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `encargadoId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudremisiones`
--

CREATE TABLE `solicitudremisiones` (
  `id` int(11) NOT NULL,
  `area` varchar(255) NOT NULL,
  `aprendizId` int(11) NOT NULL,
  `integranteId` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `documento` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aprendices`
--
ALTER TABLE `aprendices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuarioId` (`usuarioId`),
  ADD KEY `fichaId` (`fichaId`);

--
-- Indices de la tabla `fichas`
--
ALTER TABLE `fichas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `instructores`
--
ALTER TABLE `instructores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_intructor_usuario` (`usuarioId`);

--
-- Indices de la tabla `integrantes`
--
ALTER TABLE `integrantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuarioId` (`usuarioId`);

--
-- Indices de la tabla `lider_bienestar`
--
ALTER TABLE `lider_bienestar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuarioId` (`usuarioId`);

--
-- Indices de la tabla `remisiones`
--
ALTER TABLE `remisiones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `aprendizId` (`aprendizId`),
  ADD KEY `integranteId` (`integranteId`);

--
-- Indices de la tabla `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `encargadoId` (`encargadoId`);

--
-- Indices de la tabla `solicitudremisiones`
--
ALTER TABLE `solicitudremisiones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `aprendizId` (`aprendizId`),
  ADD KEY `integranteId` (`integranteId`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aprendices`
--
ALTER TABLE `aprendices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fichas`
--
ALTER TABLE `fichas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `instructores`
--
ALTER TABLE `instructores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `integrantes`
--
ALTER TABLE `integrantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `lider_bienestar`
--
ALTER TABLE `lider_bienestar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `remisiones`
--
ALTER TABLE `remisiones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicitudremisiones`
--
ALTER TABLE `solicitudremisiones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `aprendices`
--
ALTER TABLE `aprendices`
  ADD CONSTRAINT `aprendices_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `aprendices_ibfk_2` FOREIGN KEY (`fichaId`) REFERENCES `fichas` (`id`);

--
-- Filtros para la tabla `instructores`
--
ALTER TABLE `instructores`
  ADD CONSTRAINT `fk_intructor_usuario` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `instructores_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `integrantes`
--
ALTER TABLE `integrantes`
  ADD CONSTRAINT `integrantes_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `lider_bienestar`
--
ALTER TABLE `lider_bienestar`
  ADD CONSTRAINT `lider_bienestar_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `remisiones`
--
ALTER TABLE `remisiones`
  ADD CONSTRAINT `remisiones_ibfk_1` FOREIGN KEY (`aprendizId`) REFERENCES `aprendices` (`id`),
  ADD CONSTRAINT `remisiones_ibfk_2` FOREIGN KEY (`integranteId`) REFERENCES `integrantes` (`id`);

--
-- Filtros para la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD CONSTRAINT `servicios_ibfk_1` FOREIGN KEY (`encargadoId`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `solicitudremisiones`
--
ALTER TABLE `solicitudremisiones`
  ADD CONSTRAINT `solicitudremisiones_ibfk_1` FOREIGN KEY (`aprendizId`) REFERENCES `aprendices` (`id`),
  ADD CONSTRAINT `solicitudremisiones_ibfk_2` FOREIGN KEY (`integranteId`) REFERENCES `integrantes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
