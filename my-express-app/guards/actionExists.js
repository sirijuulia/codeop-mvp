const db = require("../model/helper");

async function actionExists(req, res, next) {
  const actionId = req.params.id;
  try {
    const result = await db(
      `SELECT * FROM actions WHERE actionId = ${actionId}`
    );
    if (result.data.length === 1) {
      //action found! add it to the res.locals
      res.locals.action = result.data[0];
      next();
    } else {
      //action wasn't found
      res
        .status(404)
        .send({ error: "Action not found" });
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
}

module.exports = actionExists;
