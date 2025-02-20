--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists actions;
DROP TABLE if exists users;
SET foreign_key_checks = 1;

--
-- Create Tables
-- re time - database can do it or js can do it

CREATE TABLE users(
    userID INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(40),
    lastname VARCHAR(40),
    username VARCHAR(40) not null,
    password VARCHAR(40) not null,
    PRIMARY KEY (userID)
);

CREATE TABLE actions(
    actionID INT NOT NULL AUTO_INCREMENT, 
    locationType VARCHAR(32) not null, 
    latitude FLOAT not null, 
    longtitude FLOAT not null,
    actionDescription VARCHAR(1000),
    successes VARCHAR(1000),
    lessons VARCHAR(1000),
    emotionSelf VARCHAR(32),
    emotionPartner VARCHAR(32),
    userID INT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (actionID),
    FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE cascade
    );