-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 12, 2025 at 11:35 PM
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
-- Database: `civ_age`
--

-- --------------------------------------------------------

--
-- Table structure for table `civilizaciones`
--

CREATE TABLE `civilizaciones` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `expansion` varchar(100) NOT NULL,
  `team_bonus` text DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `civilizaciones`
--

INSERT INTO `civilizaciones` (`id`, `name`, `expansion`, `team_bonus`, `img_url`) VALUES
(1, 'Britanos', 'Age of Kings', 'La Galería de tiro con arco trabaja un 10% más rápido', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_britons.png'),
(2, 'Celtas', 'Age of Kings', 'El Taller de Maquinaria de Asedio trabaja un 20% más rápido', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_celts.png'),
(3, 'Francos', 'Age of Kings', 'Los Jinetes tienen +2 de Línea de visión', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_franks.png'),
(4, 'Godos', 'Age of Kings', 'Los Cuarteles trabajan un 20% más rápido', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_goths.png'),
(5, 'Teutones', 'Age of Kings', 'Las unidades son más resistentes a la conversión', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_teutons.png'),
(6, 'Vikingos', 'Age of Kings', 'Los muelles son 15% más baratos', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_vikings.png'),
(7, 'Bizantinos', 'Age of Kings', 'Monjes sanan 100% más rápido', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_byzantines.png'),
(8, 'Persas', 'Age of Kings', 'Jinetes, Caballeros y Savar/Paladines tienen +2 de ataque contra arqueros', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_persians.png'),
(9, 'Sarracenos', 'Age of Kings', 'Los arqueros de a pie tienen +2 de ataque contra edificios estándares', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_saracens.png'),
(10, 'Turcos', 'Age of Kings', 'Las unidades de pólvora se crean un 25% más rápido', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_turks.png'),
(11, 'Chinos', 'Age of Kings', 'Las Granjas comienzan con +10% alimento', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_chinese.png'),
(12, 'Japoneses', 'Age of Kings', 'Galeras tienen +50% de Línea de visión', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_japanese.png'),
(13, 'Mongoles', 'Age of Kings', 'La línea de la Caballería de Exploración tiene +2 de línea de visión', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_mongols.png'),
(14, 'Españoles', 'The Conquerors', 'Carretas de Mercancías y Urcas generan +25% oro', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_spanish.png'),
(15, 'Hunos', 'The Conquerors', 'Los establos trabajan un 20% más rápido', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_huns.png'),
(16, 'Coreanos', 'The Conquerors', 'La línea de Mangana tiene el alcance mínimo reducido a 1', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_koreans.png'),
(17, 'Aztecas', 'The Conquerors', 'Reliquias +33% oro generado', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_aztecs.png'),
(18, 'Mayas', 'The Conquerors', 'Los muros son un 50% más baratos', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_mayans.png'),
(19, 'Eslavos', 'The Forgotten', 'Cuarteles, Establos, Galerías de tiro con arco y Talleres de Maquinaria de Asedio proporcionan un +5 de población', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_slavs.png'),
(20, 'Incas', 'The Forgotten', 'Comienzan con una llama gratis', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_inca.png'),
(21, 'Indios', 'The Forgotten', 'Camellos tienen +5 de ataque contra edificios', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_indians.png'),
(22, 'Italianos', 'The Forgotten', 'El Condotiero puede ser creado en los cuarteles de los aliados', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_italians.png'),
(23, 'Magiares', 'The Forgotten', 'Los Arqueros a caballo se crean un 25% más rápido', 'https://www.forgottenempires.net/wp-content/uploads/menu_techtree_magyars.png');

-- --------------------------------------------------------

--
-- Table structure for table `civilization_bonuses`
--

CREATE TABLE `civilization_bonuses` (
  `id` int(11) NOT NULL,
  `civilizacion_id` int(11) DEFAULT NULL,
  `bonus` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `civilization_bonuses`
--

INSERT INTO `civilization_bonuses` (`id`, `civilizacion_id`, `bonus`) VALUES
(1, 1, 'Los Centros Urbanos cuestan -50% madera a partir de la Edad de los Castillos'),
(2, 1, 'Los arqueros a pie (excepto Hostigadores) tienen +1/+2 de alcance en la Edad de los Castillos/Imperial'),
(3, 1, 'Los pastores trabajan un 25% más rápido'),
(4, 2, 'La infantería se mueve un 15% más rápido a partir de la Edad Feudal'),
(5, 2, 'Las Armas de Asedio disparan un 25% más rápido'),
(6, 2, 'Los aldeanos recogen madera un 25% más rápido'),
(7, 2, 'El ganado enemigo se puede convertir sin importar si el enemigo tiene visión sobre la unidad'),
(8, 3, 'Las mejoras para las Granjas son gratis'),
(9, 3, 'Los Castillos son un 15%/25% más baratos en la Edad de los Castillos/Imperial'),
(10, 3, 'Las Unidades montadas tienen +20% Puntos de Resistencia (a partir de la Edad Feudal)'),
(11, 3, 'Los aldeanos recogen las bayas un 15% más rápido'),
(12, 4, 'La infantería es un 20%/25%/30%/35% más barata en la Alta Edad Media/Feudal/Castillo/Imperial'),
(13, 4, 'La infantería tiene +1/+2/+3 de ataque contra edificios estándares en la Edad Feudal/Castillo/Imperial'),
(14, 4, 'Los aldeanos tienen +5 de ataque contra la caza agresiva (Jabalí, Jabalina, Elefante, Rinoceronte) y llevan +15 alimento de la caza. La caza dura 20% más'),
(15, 4, 'Telar se desarrolla instantáneamente'),
(16, 4, '+10 de población máxima en la Edad Imperial'),
(17, 5, 'Las granjas cuestan un 40% menos'),
(18, 5, 'Las torres pueden guarecer el doble de unidades'),
(19, 5, 'Matacanes y Hierbas Medicinales gratis'),
(20, 5, 'El Centro Urbano puede guarecer + 10 unidades'),
(21, 5, 'Los monjes pueden curar dos veces más lejos'),
(22, 5, 'Unidades del Cuartel y del Establo reciben +1 de armadura en la Edad de los Castillos y +1 en la Edad Imperial'),
(23, 6, 'La infantería tiene +10%/+15%/+20% Puntos de Resistencia en la Edad Feudal/Castillos/Imperial'),
(24, 6, 'Carretilla y Carro de Mano gratis'),
(25, 6, 'Los barcos de guerra son un 15%/15%/20% más baratos en la Edad Feudal/Castillos/Imperial'),
(26, 7, 'Los Edificios, Muros/Puertas, y Granjas tienen +10%/+20%/+30%/+40% Puntos de resistencia en la Alta Edad Media/Feudal/Castillos/Imperial'),
(27, 7, 'Jinetes a camello, Hostigadores y Lanceros cuestan un -25%'),
(28, 7, 'Brulotes y Dromones tienen un +25% de velocidad de ataque'),
(29, 7, 'Avanzar a la Edad Imperial cuesta un -33%'),
(30, 7, 'Guardia Urbana y Patrulla Urbana gratis'),
(31, 8, '+50 alimento, +50 madera al inicio del juego'),
(32, 8, 'Centro Urbano y Muelle tienen el doble de Puntos de Resistencia y trabajan un 5%/10%/15%/20% más rápido en la Alta Edad Media/Feudal/Castillos/Imperial'),
(33, 8, 'Tácticas de los Partos disponible en la Edad de los Castillos'),
(34, 8, 'Unidades montadas obtienen 5 oro por cada unidad militar asesinada'),
(35, 8, 'Pueden construir Caravanserai en la Edad Imperial'),
(36, 9, 'La tasa del Mercado es sólo del 5%'),
(37, 9, 'Mercado cuesta 75 madera'),
(38, 9, 'Los Barcos de Transporte tienen el doble de Puntos de Resistencia y pueden llevar +5 unidades'),
(39, 9, 'Las Galeras atacan un 25% más rápido'),
(40, 9, 'Las unidades de la Galería de tiro con arco (excepto el Hostigador y el Artillero Manual) tienen +1/+2/+3 de ataque contra edificios estándares en la Edad Feudal/Castillos/Imperial'),
(41, 10, 'Las unidades de pólvora tienen +25% Puntos de Resistencia'),
(42, 10, 'Las tecnologías de pólvora son 50% más baratas'),
(43, 10, 'Química gratis'),
(44, 10, 'Los minadores trabajan un 20% más rápido'),
(45, 10, 'La mejora a Caballería Ligera y Húsar son gratis'),
(46, 11, 'Comienzan la partida con +3 Aldeanos, pero con -200 alimento, -50 madera'),
(47, 11, 'Los Centros Urbanos soportan 15 de población (en vez de cinco) y tienen +7 de Línea de visión'),
(48, 11, 'Las tecnologías son un 5%/10%/15% más baratas en la Edad Feudal/Castillos/Imperial'),
(49, 11, 'Los Buques de demolición tienen +50% Puntos de Resistencia'),
(50, 12, 'Pesqueros tienen el doble de Puntos de Resistencia, +2 de armadura anti-proyectil y trabajan un 5%/10%/15%/20% más rápido en la Alta Edad Media/Feudal/Castillos/Imperial'),
(51, 12, 'Molinos, campamentos madereros y mineros son un 50% más baratos'),
(52, 12, 'La infantería ataca un 33% más rápido desde la Edad Feudal'),
(53, 13, 'Los cazadores trabajan un 40% más rápido'),
(54, 13, 'La Caballería Ligera, Húsar, y Lancero estepario tienen un +30% de puntos de resistencia'),
(55, 13, 'La Caballería de arqueros, Caballería Pesada de Arqueros y los Mangudai disparan un +25% más rápido'),
(56, 14, 'Los aldeanos construyen un 30% más rápido (20% las Maravillas)'),
(57, 14, 'Las mejoras en la herrería no cuestan oro'),
(58, 14, 'Los proyectiles de los galeones artillados pueden rastrear objetivos en movimiento y se mueven más rápido'),
(59, 14, 'Las Unidades de pólvora disparan un 18% más rápido'),
(60, 14, 'Recibe 20 oro por cada tecnología desarrollada'),
(61, 15, 'Comienzan con -100 madera, pero su límite de población está al máximo'),
(62, 15, 'En mapas nómadas, el primer Centro Urbano crea un caballo explorador'),
(63, 15, 'Los Arqueros a caballo son 10%/20% más baratos en la Edad de los Castillos/Imperial'),
(64, 15, 'Los Lanzapiedras son un 35% más precisos contra unidades'),
(65, 16, 'Aldeanos tiene +3 Línea de visión'),
(66, 16, 'Canteros trabajan 20% más rápido'),
(67, 16, 'Las Torres se mejoran gratis al avanzar de Edad (la Torre de Bombardeo requiere de Química)'),
(68, 16, 'Las mejoras para armadura para arqueros son gratis'),
(69, 16, 'Los Barcos cuestan -20% madera'),
(70, 16, 'Los Arqueros y la infantería cuestan -50% madera'),
(71, 17, 'Los aldeanos llevan +3 de todos los recursos'),
(72, 17, 'Las unidades militares se crean un +11% más rápido'),
(73, 17, 'Los monjes reciben +5 PR por cada tecnología del monasterio desarrollada'),
(74, 17, 'Comienzan con +50 oro'),
(75, 18, 'Empiezan con un aldeano adicional, pero -50 alimento'),
(76, 18, 'Los recursos naturales tardan un 15% más en agotarse'),
(77, 18, 'Las unidades de arqueros (excepto Hostigadores) cuestan -10%/-20%/-30% en la Edad Feudal/Castillos/Imperial'),
(78, 19, 'Las Armas de asedio son un 15% más baratas'),
(79, 19, 'Suministros y Gambesones gratis'),
(80, 19, 'Los Granjeros trabajan un 15% mas rápido'),
(81, 19, 'Los Monjes se mueven un 20% más rápido'),
(82, 20, 'Unidades militares cuestan -10%/-15%/-20%/-25% alimento en Alta Edad Media/Feudal/Castillos/Imperial'),
(83, 20, 'Las mejoras de la infantería en la Herrería afectan a los aldeanos a partir de la Edad de los Castillos'),
(84, 20, 'Las casas admiten 10 de población'),
(85, 20, 'Los edificios cuestan un -15% piedra'),
(86, 21, 'Aldeanos cuestan -10% en Alta Edad Media, -15% en la Edad Feudal, -20% en Edad de los Castillos, -30% en Edad Imperial'),
(87, 21, 'Aldeanos pescan 15% más rápido y cargan +25 unidades de pescado'),
(88, 21, 'Camellos tienen +1/+1 de armadura'),
(89, 22, 'Avanzar a la siguiente edad cuesta un 15% más barato'),
(90, 22, 'Las tecnologías del muelle y de la Universidad cuestan un -33%'),
(91, 22, 'Los Pesqueros cuestan un -15%'),
(92, 22, 'Las unidades de pólvora cuestan un -20%'),
(93, 23, 'Los Aldeanos matan a los animales salvajes de un solo golpe'),
(94, 23, 'Forja, Fundición de Hierro y Alto Horno son gratis'),
(95, 23, 'Caballería de Exploración y subsiguientes son un 10% más baratos');

-- --------------------------------------------------------

--
-- Table structure for table `focus`
--

CREATE TABLE `focus` (
  `id` int(11) NOT NULL,
  `civilizacion_id` int(11) DEFAULT NULL,
  `focus_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `focus`
--

INSERT INTO `focus` (`id`, `civilizacion_id`, `focus_name`) VALUES
(1, 1, 'Arqueros'),
(2, 2, 'Infantería'),
(3, 3, 'Caballería'),
(4, 4, 'Infantería'),
(5, 5, 'Infantería'),
(6, 6, 'Naval'),
(7, 7, 'Defensa'),
(8, 8, 'Caballería'),
(9, 9, 'Camellos'),
(10, 9, 'Naval'),
(11, 10, 'Pólvora'),
(12, 11, 'Arqueros'),
(13, 12, 'Infantería'),
(14, 13, 'Arqueros a caballo'),
(15, 14, 'Monjes'),
(16, 14, 'Pólvora'),
(17, 15, 'Caballería'),
(18, 16, 'Defensa'),
(19, 16, 'Naval'),
(20, 17, 'Infantería'),
(21, 17, 'Monjes'),
(22, 18, 'Arqueros'),
(23, 19, 'Infantería'),
(24, 19, 'Armas de asedio'),
(25, 20, 'Infantería'),
(26, 21, 'Camellos'),
(27, 21, 'Pólvora'),
(28, 22, 'Arqueros'),
(29, 22, 'Naval'),
(30, 23, 'Caballería');

-- --------------------------------------------------------

--
-- Table structure for table `unique_techs`
--

CREATE TABLE `unique_techs` (
  `id` int(11) NOT NULL,
  `civilizacion_id` int(11) DEFAULT NULL,
  `tech_name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `unique_techs`
--

INSERT INTO `unique_techs` (`id`, `civilizacion_id`, `tech_name`, `description`) VALUES
(1, 1, 'Voluntarios de caballería', 'Los arqueros a pie tienen +1 de alcance y las Torres +2 de ataque'),
(2, 1, 'Warwolf', 'Los Lanzapiedras obtienen daño en área y +100% de puntería contra unidades'),
(3, 2, 'Bastión', 'Los Castillos y torres disparan un 33% más rápido'),
(4, 2, 'Furor Celta', 'Las unidades del Taller de Maquinaria de Asedio tienen un +40% de Puntos de Resistencia'),
(5, 3, 'Hacha de Arista', 'Otorga a los Lanzadores de hachas +1 de alcance'),
(6, 3, 'Código Caballeresco', 'Aumenta la velocidad de trabajo de los Establos en un +40%'),
(7, 4, 'Anarquía', 'Otorga a la infantería +5 de ataque contra caballería y +4 de ataque contra camellos'),
(8, 4, 'Movilización', 'Aumenta la velocidad de regeneración de los Berserkers'),
(9, 5, 'Blindaje', 'Armas de asedio tienen +3 de armadura'),
(10, 5, 'Almenas', '+3 alcance de castillos; infantería guarecida dispara flechas'),
(11, 6, 'Hésires', 'Otorga a la infantería +5 de ataque contra caballería y +4 de ataque contra camellos'),
(12, 6, 'Trance Frenético', 'Aumenta la velocidad de regeneración de los Berserkers'),
(13, 7, 'Fuego Griego', 'Los Brulotes obtienen +1 de alcance; Dromones +0.2 de daño en área; Torres de Bombardeo +0.5 de daño en área'),
(14, 7, 'Logística', 'Otorga a las Catafractas daño en área en un radio de 0.5 (daño puro de 5); y +6 de ataque contra infantería'),
(15, 8, 'Kamandaran', 'El coste en oro del arquero y subsiguientes es remplazado por madera'),
(16, 8, 'Ciudadelas', 'Los Castillos +4 de ataque, +3 contra Ariete, +3 contra Infantería y reciben -25% de daño adicional'),
(17, 9, 'Fanatismo', 'Otorga a las unidades en camello +20 Puntos de Resistencia'),
(18, 9, 'Contrapesos', 'Lanzapiedras y Manganas +15% de ataque'),
(19, 10, 'Sipahi', 'Otorga a la Caballería de Arqueros +20 de Puntos de Resistencia'),
(20, 10, 'Artillería', 'Otorga a los cañones de asedio, galeones artillados y Torres de Bombardeo +2 de alcance'),
(21, 11, 'Gran Muralla', 'Aumenta los Puntos de resistencia de los muros y torres en un +30%'),
(22, 11, 'Cohetería', 'Aumenta el ataque de los Chu Ko Nu en +2 y de los Escorpiones en +4'),
(23, 12, 'Yasama', 'Otorga flechas adicionales a las torres'),
(24, 12, 'Kataparuto', 'Hace que los Lanzapiedras se empaqueten, se armen y disparen más rápido'),
(25, 13, 'Nómadas', 'Las casas mantienen su población si han sido destruidas'),
(26, 13, 'Instrucción Militar', 'Aumenta la velocidad de movimiento de las Armas de Asedio en un +50%'),
(27, 14, 'Inquisición', 'Incrementa la velocidad de conversión de los monjes y misioneros. Misionero +1 de rango'),
(28, 14, 'Supremacía', 'Otorga a los Aldeanos +6 de ataque, +2/+2 de armadura y +40 Puntos de resistencia'),
(29, 15, 'Razias', 'Los tarcanos se pueden crear en el Establo'),
(30, 15, 'Ateísmo', 'Las victorias por Maravilla o reliquias +100 años y reduce la generación de recursos por Reliquia enemiga en un 50%'),
(31, 16, 'Eupseong', 'Las torres (excepto Torres de Bombardeo) obtienen +2 de alcance'),
(32, 16, 'Shinkichon', 'Otorga a la línea de Manganas +1 de alcance'),
(33, 17, 'Átlatl', 'Los Guerrilleros obtienen +1 de ataque y alcance'),
(34, 17, 'Guerras Florales', 'La infantería obtiene +4 de ataque'),
(35, 18, 'Jabalineros Hul\'che', 'Otorga a los Hostigadores un segundo proyectil'),
(36, 18, 'El Dorado', 'Los Guerreros Águila obtienen +40 Puntos de Resistencia'),
(37, 19, 'Detinets', 'Reemplaza el 40% del coste de piedra de los Castillos y torres por madera'),
(38, 19, 'Druzhina', 'Las unidades de infantería dañan a los enemigos adyacentes'),
(39, 20, 'Huaracas', 'Los Honderos +1 ataque y remueve el alacance mínimo de los Hostigadores y Honderos'),
(40, 20, 'Escudos de Tela', 'Los Kamayuks, los Honderos y los Guerreros Águilas obtienen +1/+2 de armadura'),
(41, 21, 'Sultanato', 'Toda forma de acumulación de oro es 10% más rápida (minería, comercio, reliquias)'),
(42, 21, 'Shatagni', 'Los artilleros manuales tienen +1 de alcance'),
(43, 22, 'Escudo Pavés', 'Los arqueros a pie y Condotieros reciben +1/+1 armadura'),
(44, 22, 'Ruta de la Seda', 'Carreta de Mercancías y Urca Mercante cuestan -50%'),
(45, 23, 'Ejército Corviniano', 'El Huszár Magiar no cuesta oro'),
(46, 23, 'Arco Recurvo', 'Los arqueros a caballo tienen +1 de alcance');

-- --------------------------------------------------------

--
-- Table structure for table `unique_units`
--

CREATE TABLE `unique_units` (
  `id` int(11) NOT NULL,
  `civilizacion_id` int(11) DEFAULT NULL,
  `unit_name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `unique_units`
--

INSERT INTO `unique_units` (`id`, `civilizacion_id`, `unit_name`, `description`) VALUES
(1, 1, 'Arquero de tiro largo', 'Arquero a pie de largo alcance'),
(2, 2, 'Invasor de pastos', 'Unidad de infantería veloz'),
(3, 3, 'Lanzador de Hachas', 'Unidad de infantería con ataque a distancia'),
(4, 4, 'Huscarle', 'Infantería que es virtualmente inmune al fuego de los arqueros'),
(5, 5, 'Caballero de la Orden Teutónica', 'Unidad de infantería con mucha armadura y ataque'),
(6, 6, 'Berserker', 'Infantería que regenera sus Puntos de resistencia'),
(7, 6, 'Drakkar', 'Barco de guerra que dispara múltiples flechas'),
(8, 7, 'Catafracta', 'Caballería pesada que destaca en el combate contra la infantería y los jinetes a camello'),
(9, 8, 'Elefante de Guerra', 'Unidad lenta pero poderosa de caballería'),
(10, 8, 'Savar', 'Mejora única del Caballero, remplazando al Paladín'),
(11, 9, 'Mameluco', 'Caballería con ataque de melé a distancia y con bonificación de ataque contra otra caballería'),
(12, 10, 'Jenízaro', 'Versión más fuerte del Artillero Manual'),
(13, 11, 'Chu Ko Nu', 'Arquero con ballesta de repetición. Dispara múltiples flechas al mismo tiempo'),
(14, 12, 'Samurái', 'Infantería con ataque rápido y bonificación de daño contra unidades únicas'),
(15, 13, 'Mangudai', 'Arquero a caballo con una bonificación de ataque contra las armas de asedio'),
(16, 14, 'Conquistador', 'Unidad de pólvora a caballo'),
(17, 14, 'Misionero', 'Monje montado'),
(18, 15, 'Tarcano', 'Caballería que destaca por arrasar edificios'),
(19, 16, 'Carreta de Guerra', 'Caballería de arqueros blindada'),
(20, 16, 'Barco Tortuga', 'Barco blindado que dispara bolas de cañón'),
(21, 17, 'Guerrero Jaguar', 'Infantería que tiene ataque adicional contra otra infantería'),
(22, 18, 'Arquero Emplumado', 'Arquero a pie con mucha movilidad y gran defensa anti-proyectil'),
(23, 19, 'Boyardo', 'Caballería pesada muy resistente al daño cuerpo a cuerpo'),
(24, 20, 'Hondero', 'Arquero con bonificación de ataque contra infantería'),
(25, 20, 'Kamayuk', 'Infantería con lanza larga que puede atacar desde la distancia'),
(26, 21, 'Arquero en Elefante', 'Arquero montado'),
(27, 21, 'Camello Imperial', 'Camello anti caballería'),
(28, 22, 'Genovés Ballestero', 'Arquero con alto valor de armadura y bonificación de ataque contra la caballería'),
(29, 22, 'Condotiero', 'Unidad de infantería con bonificación de ataque contra las unidades de pólvora'),
(30, 23, 'Huszár Magiar', 'Unidad de caballería con bonificación de ataque contra las armas de asedio');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `civilizaciones`
--
ALTER TABLE `civilizaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `civilization_bonuses`
--
ALTER TABLE `civilization_bonuses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `civilizacion_id` (`civilizacion_id`);

--
-- Indexes for table `focus`
--
ALTER TABLE `focus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `civilizacion_id` (`civilizacion_id`);

--
-- Indexes for table `unique_techs`
--
ALTER TABLE `unique_techs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `civilizacion_id` (`civilizacion_id`);

--
-- Indexes for table `unique_units`
--
ALTER TABLE `unique_units`
  ADD PRIMARY KEY (`id`),
  ADD KEY `civilizacion_id` (`civilizacion_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `civilization_bonuses`
--
ALTER TABLE `civilization_bonuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `focus`
--
ALTER TABLE `focus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `unique_techs`
--
ALTER TABLE `unique_techs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `unique_units`
--
ALTER TABLE `unique_units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `civilization_bonuses`
--
ALTER TABLE `civilization_bonuses`
  ADD CONSTRAINT `civilization_bonuses_ibfk_1` FOREIGN KEY (`civilizacion_id`) REFERENCES `civilizaciones` (`id`);

--
-- Constraints for table `focus`
--
ALTER TABLE `focus`
  ADD CONSTRAINT `focus_ibfk_1` FOREIGN KEY (`civilizacion_id`) REFERENCES `civilizaciones` (`id`);

--
-- Constraints for table `unique_techs`
--
ALTER TABLE `unique_techs`
  ADD CONSTRAINT `unique_techs_ibfk_1` FOREIGN KEY (`civilizacion_id`) REFERENCES `civilizaciones` (`id`);

--
-- Constraints for table `unique_units`
--
ALTER TABLE `unique_units`
  ADD CONSTRAINT `unique_units_ibfk_1` FOREIGN KEY (`civilizacion_id`) REFERENCES `civilizaciones` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
