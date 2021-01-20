const router = require("express").Router();

const db = require("../../utils/db");

router.get("/", async (req, res, next) => {
  try {
    const { rows } = await db.query("SELECT * FROM categories;");
    console.log(rows)
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});
router.get("/count", async (req, res, next) => {
  try {
    const { rows } = await db.query("SELECT categories.category_id, categories.name, COUNT(articles.category_id) AS total_articles FROM categories INNER JOIN articles ON categories.category_id=articles.category_id GROUP BY (categories.category_id);");
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
        `SELECT * FROM categories WHERE category_id=${parseInt(req.params.id, 10)}`
    );
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {name, img} = req.body;
    const query = `INSERT INTO  categories (name, img) VALUES ('${name}', '${img}');`;
    const result = await db.query(query);
    res.status(201).send("POSTED");
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const {name, img} = req.body;
    const id = parseInt(req.params.id);
    const query = `UPDATE categories SET name='${name}', img='${img}' WHERE category_id=${id};`
    const result = await db.query(query);
    res.status(200).send("successfully updated");
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { rows } = await db.query(
        `DELETE FROM categories WHERE category_id=${parseInt(req.params.id, 10)}`
    );
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;