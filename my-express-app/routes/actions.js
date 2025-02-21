const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const actionExists = require("../guards/actionExists");

// Returns all actions with the username associated with the userID, using a LEFT JOIN SQL method
// Used in most routes
const getActionsWithUsersSQL =
  "Select a.*, u.username FROM actions AS a LEFT JOIN users AS u on a.userID=u.userID";

/*GET all actions */
router.get("/", async function (req, res, next) {
  try {
    const results = await db(
      getActionsWithUsersSQL
    );
    const response = results.data;
    res.send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/*POST action */
//Action entries have manually inputted items and additionally ActionID (auto-increment) and date (automatic timestamp in SQL)
router.post("/", async function (req, res, next) {
  const {
    locationType,
    latitude,
    longtitude,
    actionDescription,
    successes,
    lessons,
    emotionSelf,
    emotionPartner,
    userID,
  } = req.body;
  const sql = `INSERT INTO actions (locationType, latitude, longtitude, actionDescription, successes, lessons, emotionSelf, emotionPartner, userID) VALUES ("${locationType}", "${latitude}", "${longtitude}", "${actionDescription}", "${successes}", "${lessons}", "${emotionSelf}", "${emotionPartner}", "${userID}")`;
  try {
    await db(sql);
    const response = await db(
      getActionsWithUsersSQL
    );
    res.status(201).send(response.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/*GET specific action */
router.get(
  "/:id",
  actionExists,
  async function (req, res, next) {
    try {
      //actionExists saves the action with specific ID in res.locals.action
      res.status(200).send(res.locals.action);
    } catch (err) {
      res
        .status(500)
        .send({ error: err.message });
    }
  }
);

/*DELETE specific action */
router.delete(
  "/:id",
  actionExists,
  async function (req, res, next) {
    const actionId = req.params.id;
    const sql = `DELETE FROM actions WHERE actionId = ${actionId}`;
    try {
      await db(sql);
      const response = await db(
        getActionsWithUsersSQL
      );
      res.status(200).send(response.data);
    } catch (err) {
      res
        .status(500)
        .send({ error: err.message });
    }
  }
);

module.exports = router;
