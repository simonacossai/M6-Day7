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