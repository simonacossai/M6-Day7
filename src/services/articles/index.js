const router = require("express").Router();

const db = require("../../utils/db");

router.get("/", async (req, res, next) => {
  try {
    const { rows } = await db.query("SELECT * FROM articles;");
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
        `SELECT * FROM articles WHERE article_id=${parseInt(req.params.id, 10)}`
    );
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { author_id, category_id, headline, content, cover } = req.body;
    const query = `INSERT INTO  articles (author_id, category_id, headline, content, cover) VALUES (${author_id},${category_id},'${headline}', '${content}', '${cover}');`;
    const result = await db.query(query);
    res.status(201).send("POSTED");
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { author_id, category_id, headline, content, cover } = req.body;
    const id = parseInt(req.params.id);
    const query = `UPDATE articles SET author_id=${author_id}, category_id=${category_id}, headline='${headline}', content='${content}', cover='${cover}' WHERE article_id=${id};`
    const result = await db.query(query);
    res.status(200).send("successfully updated");
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { rows } = await db.query(
        `DELETE FROM articles WHERE article_id=${parseInt(req.params.id, 10)}`
    );
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get("/:id/reviews", async (req, res, next) => {
    try {
      const { rows } = await db.query(
          `SELECT * FROM reviews WHERE article_id=${parseInt(req.params.id, 10)}`
      );
      res.send(rows);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  });

  router.get("/:id/reviews/:review_id", async (req, res, next) => {
    try {
      const { rows } = await db.query(
          `SELECT * FROM reviews WHERE article_id=${parseInt(req.params.id, 10)} AND review_id=${parseInt(req.params.review_id, 10)}`
      );
      res.send(rows);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  });



module.exports = router;