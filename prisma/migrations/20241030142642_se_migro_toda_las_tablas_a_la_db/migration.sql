/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Usuario` (
    `usuario_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido` VARCHAR(50) NOT NULL,
    `correo` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `rol` ENUM('admin', 'cliente') NOT NULL DEFAULT 'cliente',

    UNIQUE INDEX `Usuario_correo_key`(`correo`),
    PRIMARY KEY (`usuario_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bus` (
    `bus_id` INTEGER NOT NULL AUTO_INCREMENT,
    `placa` VARCHAR(10) NOT NULL,
    `modelo` VARCHAR(50) NULL,
    `capacidad` INTEGER NOT NULL,

    UNIQUE INDEX `Bus_placa_key`(`placa`),
    PRIMARY KEY (`bus_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ruta` (
    `ruta_id` INTEGER NOT NULL AUTO_INCREMENT,
    `origen` VARCHAR(100) NOT NULL,
    `destino` VARCHAR(100) NOT NULL,
    `distancia_km` DECIMAL(65, 30) NULL,

    PRIMARY KEY (`ruta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Horario` (
    `horario_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `hora_salida` DATETIME(3) NOT NULL,
    `hora_llegada` DATETIME(3) NOT NULL,
    `precio` DECIMAL(8, 2) NOT NULL,
    `ruta_id` INTEGER NOT NULL,
    `bus_id` INTEGER NOT NULL,

    PRIMARY KEY (`horario_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asiento` (
    `asiento_id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_asiento` VARCHAR(5) NOT NULL,
    `tipo` ENUM('ventana', 'pasillo') NOT NULL,
    `bus_id` INTEGER NOT NULL,

    PRIMARY KEY (`asiento_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reserva` (
    `reserva_id` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` ENUM('pendiente', 'pagado', 'cancelado') NOT NULL DEFAULT 'pendiente',
    `fecha_reserva` DATETIME(3) NOT NULL,
    `monto_total` DECIMAL(8, 2) NOT NULL,
    `usuario_id` INTEGER NOT NULL,
    `horario_id` INTEGER NOT NULL,
    `asiento_id` INTEGER NOT NULL,

    PRIMARY KEY (`reserva_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_ruta_id_fkey` FOREIGN KEY (`ruta_id`) REFERENCES `Ruta`(`ruta_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_bus_id_fkey` FOREIGN KEY (`bus_id`) REFERENCES `Bus`(`bus_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asiento` ADD CONSTRAINT `Asiento_bus_id_fkey` FOREIGN KEY (`bus_id`) REFERENCES `Bus`(`bus_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`usuario_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_horario_id_fkey` FOREIGN KEY (`horario_id`) REFERENCES `Horario`(`horario_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_asiento_id_fkey` FOREIGN KEY (`asiento_id`) REFERENCES `Asiento`(`asiento_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
