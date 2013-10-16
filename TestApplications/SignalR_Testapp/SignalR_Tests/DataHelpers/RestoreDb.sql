drop table if exists `test`.`bid`;
drop table if exists `test`.`item`;
drop table if exists `test`.`user`;


CREATE  TABLE `test`.`user` (

  `UserID` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT ,

  `Username` VARCHAR(100) NOT NULL ,

  `Lastname` VARCHAR(100) NOT NULL ,

  `Password` VARCHAR(45) NOT NULL ,

  `Adress` VARCHAR(100) NOT NULL ,

  `Firstname` VARCHAR(100) NOT NULL ,

  PRIMARY KEY (`UserID`) );

CREATE  TABLE `test`.`item` (

`itemno` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT ,

`name` VARCHAR(100) NOT NULL ,

  `price` INT(11) NOT NULL ,

  `expires` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,

  `description` VARCHAR(500) NOT NULL ,

 `addedByID` INT(10) UNSIGNED NOT NULL ,

  PRIMARY KEY (`itemno`) ,

  INDEX `fk_addedByID_idx` (`addedByID` ASC) ,

  CONSTRAINT `fk_addedByID`

    FOREIGN KEY (`addedByID` )

    REFERENCES `test`.`user` (`UserID` )

    ON DELETE CASCADE

    ON UPDATE CASCADE);

CREATE  TABLE `test`.`bid` (

`bidID` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT ,

`itemno` INT(10) UNSIGNED NOT NULL ,

`userID` INT(10) UNSIGNED NOT NULL ,

`value` INT(10) UNSIGNED NOT NULL ,

`username` VARCHAR(100) NOT NULL ,

  PRIMARY KEY (`bidID`) ,

  INDEX `fk_itemno_idx` (`itemno` ASC) ,

  INDEX `fk_userID_idx` (`userID` ASC) ,

  CONSTRAINT `fk_itemno`

    FOREIGN KEY (`itemno` )

    REFERENCES `test`.`item` (`itemno` )

    ON DELETE CASCADE

    ON UPDATE CASCADE,

  CONSTRAINT `fk_userID`

    FOREIGN KEY (`userID` )

    REFERENCES `test`.`user` (`UserID` )

    ON DELETE CASCADE

    ON UPDATE CASCADE);

INSERT INTO `test`.`user` (`Username`, `Lastname`, `Password`, `Adress`, `Firstname`) VALUES ('Mozilla', 'Firefox', '123', 'Mozilla Lane', 'Mozilla');

INSERT INTO `test`.`user` (`Username`, `Lastname`, `Password`, `Adress`, `Firstname`) VALUES ('Chrome', 'Google', '123', 'Google Street', 'Google');

INSERT INTO `test`.`user` (`Username`, `Lastname`, `Password`, `Adress`, `Firstname`) VALUES ('IE10', 'Explorer Ten', '123', 'Works Street', 'Internet');

INSERT INTO `test`.`user` (`Username`, `Lastname`, `Password`, `Adress`, `Firstname`) VALUES ('IE8', 'Explorer Eight', '123', 'Bad Street', 'Internet');

INSERT INTO `test`.`user` (`Username`, `Lastname`, `Password`, `Adress`, `Firstname`) VALUES ('Opera', 'Nordmann', '123', 'Drammensveien 1', 'Ola');


INSERT INTO `test`.`item` (`name`, `addedByID`, `description`, `expires`, `price`) VALUES ('Car', '2', 'This is an expensice product', '2014-11-16 00:00:00', '300000');

INSERT INTO `test`.`item` (`name`, `addedByID`, `description`, `expires`, `price`) VALUES ('PC', '2', 'This runs Windows.Wooot!', '2013-03-15 08:42:00', '5500');

INSERT INTO `test`.`item` (`name`, `addedByID`, `description`, `expires`, `price`) VALUES ('iPhone', '1', 'This is a hipster product', '2013-02-12 00:00:00', '4000');

INSERT INTO `test`.`item` (`name`, `addedByID`, `description`, `expires`, `price`) VALUES ('Tesla', '2', 'This car is so awesome', '2014-11-16 00:00:00', '300000');



INSERT INTO `test`.`bid` (`itemno`, `userID`, `value`, `username`) VALUES ('1', '3', '350000', 'IE10');

INSERT INTO `test`.`bid` (`itemno`, `userID`, `value`, `username`) VALUES ('1', '2', '400000', 'Chrome');

INSERT INTO `test`.`bid` (`itemno`, `userID`, `value`, `username`) VALUES ('3', '1', '4000', 'Mozilla');

INSERT INTO `test`.`bid` (`itemno`, `userID`, `value`, `username`) VALUES ('3', '4', '4500', 'IE8');

INSERT INTO `test`.`bid` (`itemno`, `userID`, `value`, `username`) VALUES ('2', '2', '0', 'Chrome');
