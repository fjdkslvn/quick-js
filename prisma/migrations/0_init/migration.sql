-- CreateTable
CREATE TABLE `docs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `side_submenu_id` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `display_code` TEXT NOT NULL,

    INDEX `side_submenu_id`(`side_submenu_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `create_date` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `side_menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `link` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `side_submenu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `side_menu_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `link` VARCHAR(255) NOT NULL,

    INDEX `side_menu_id`(`side_menu_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `docs` ADD CONSTRAINT `docs_ibfk_1` FOREIGN KEY (`side_submenu_id`) REFERENCES `side_submenu`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `side_submenu` ADD CONSTRAINT `side_submenu_ibfk_1` FOREIGN KEY (`side_menu_id`) REFERENCES `side_menu`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

