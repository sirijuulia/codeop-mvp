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

INSERT INTO users (firstname, lastname, username, password) VALUES ("Siri", "Pantzar", "sirijuulia", "salasana"), ("Luke", "Danes", "lukesdiner", "1234"), ("Leslie", "Knope", "parksforlife", "beautifulAnn");

INSERT INTO actions (locationType, latitude, longtitude, actionDescription, successes, lessons, emotionSelf, emotionPartner, userID) VALUES ("Point", "55.95104509358435", "-3.1525929387219076", "Test chat in Holyrood Park", "Good times", "It is still hard", "happy", "confused", "3"), ("Point", "55.9411649977082", "-3.1941314099749833", "Another test chat - on the Meadows", "We had an awesome time!", "More of this please", "excited", "excited", "2"), ("Point", "55.95481786189838", "-3.181766306531127", "One final test chat - Calton Hill", "It works!", "It's late", "confused", "sad", "1");
    