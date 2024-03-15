<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240303171145 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE day_time (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(40) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('DROP INDEX `primary` ON days');
        $this->addSql('ALTER TABLE days CHANGE id id INT AUTO_INCREMENT NOT NULL, CHANGE day_name name VARCHAR(45) NOT NULL');
        $this->addSql('ALTER TABLE days ADD PRIMARY KEY (id)');
        $this->addSql('ALTER TABLE parking CHANGE id id INT AUTO_INCREMENT NOT NULL, CHANGE vehicle vehicle VARCHAR(45) NOT NULL, CHANGE license_plate license_plate VARCHAR(45) NOT NULL, CHANGE comment comment VARCHAR(45) DEFAULT NULL, ADD PRIMARY KEY (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE day_time');
        $this->addSql('ALTER TABLE days MODIFY id INT NOT NULL');
        $this->addSql('DROP INDEX `PRIMARY` ON days');
        $this->addSql('ALTER TABLE days CHANGE id id INT NOT NULL, CHANGE name day_name VARCHAR(45) NOT NULL');
        $this->addSql('ALTER TABLE days ADD PRIMARY KEY (day_name)');
        $this->addSql('ALTER TABLE parking MODIFY id INT NOT NULL');
        $this->addSql('DROP INDEX `primary` ON parking');
        $this->addSql('ALTER TABLE parking CHANGE id id INT NOT NULL, CHANGE vehicle vehicle VARCHAR(45) DEFAULT NULL, CHANGE license_plate license_plate VARCHAR(45) DEFAULT NULL, CHANGE comment comment VARCHAR(45) NOT NULL');
    }
}
