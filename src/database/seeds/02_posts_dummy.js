const faker = require('faker');
const { usersMax, postsMax } = require('./seedConfig.json');

exports.seed = knex => knex('posts')
  .del()
  .then(() => {
    // TODO reset the auto increment of users
    const posts = [];
    for (let i = 0; i < postsMax; i += 1) {
      const rndUserId = Math.floor(Math.random() * usersMax) + 1;
      const lineBreak = '';
      const body = faker.lorem.paragraph(2)
          + lineBreak
          + faker.lorem.paragraph(5)
          + lineBreak
          + faker.lorem.paragraph(2);

      const post = {
        title: faker.lorem.sentence(5),
        body,
        author_id: rndUserId,
      };
      posts.push(post);
    }

    return knex('posts').insert(posts);
  });
