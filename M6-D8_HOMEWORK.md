# M6-D8 HOMEWORK

- Get articles with author and category by joining tables
SELECT a.id, a.headline, a.content, a.cover, w.name as author_name, w.img as author_pic, c.name, c.img FROM articles AS a INNER JOIN authors AS w ON a.author_id=w.author_id INNER JOIN categories AS c ON a.category_id=c.category_id

- Search articles with title or content
- Count categories group by them id
- Sum total claps , reviews for an article
