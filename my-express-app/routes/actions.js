const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const actionExists = require("../guards/actionExists");
/*GET all actions */
router.get("/", async function (req, res, next) {
  const sql =
    "Select a.*, u.username FROM actions AS a LEFT JOIN users AS u on a.userID=u.userID";
  try {
    const results = await db(sql);
    const response = results.data;
    res.send(response);
  } catch (err) {
    res.status(500).send(`Server error: ${err}`);
  }
});

/*POST action */
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
      "Select a.*, u.username FROM actions AS a LEFT JOIN users AS u on a.userID=u.userID"
    );
    res.status(201).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

/*GET specific action */
router.get(
  "/:id",
  actionExists,
  async function (req, res, next) {
    try {
      res.status(200).send(res.locals.action);
    } catch (err) {
      res.status(500).send(err);
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
        "Select a.*, u.username FROM actions AS a LEFT JOIN users AS u on a.userID=u.userID"
      );
      res.status(200).send(response.data);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

module.exports = router;
