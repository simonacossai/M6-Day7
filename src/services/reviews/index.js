const router = require("express").Router();

const db = require("../../utils/db");

router.get("/", async (req, res, next) => {
  try {
    const { rows } = await db.query("SELECT * FROM reviews;");
    console.log(rows)
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { rows } = await db.query(
        `SELECT * FROM reviews WHERE review_id=${parseInt(req.params.id, 10)}`
    );
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {article_id, user_name, review} = req.body;
    const query = `INSERT INTO  reviews (article_id, user_name, review) VALUES (${article_id}, '${user_name}', '${review}');`;
    const result = await db.query(query);
    res.status(201).send("POSTED");
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const {article_id, user_name, review} = req.body;
    const id = parseInt(req.params.id);
    const query = `UPDATE reviews SET article_id=${article_id}, user_name='${user_name}', review='${review}' WHERE review_id=${id};`
    const result = await db.query(query);
    res.status(200).send("successfully updated");
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { rows } = await db.query(
        `DELETE FROM reviews WHERE review_id=${parseInt(req.params.id, 10)}`
    );
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;