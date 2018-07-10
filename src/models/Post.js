const knex = require('../database/knex');
// const sh = require('../utils/stringHelpers');

const TABLE_NAME = 'posts';
// const COMMENT_TABLE = 'comments';

function fetchAll(userId) {
  // console.log(99999, userId);
  return knex(TABLE_NAME)
    .select()
    .where({ author_id: userId });
}

// function fetchAllWithComments(userId) {
//   return knex(TABLE_NAME)
//     .innerJoin(COMMENT_TABLE, `${TABLE_NAME}.id`, `${COMMENT_TABLE}.post_id`)
//     .select(
//       { post_id: 'posts.id' },
//       { post_title: 'posts.title' },
//       { post_body: 'posts.body' },
//       { post_author_id: 'posts.user_id' },
//       { post_created_at: 'posts.created_at' },
//       { post_updated_at: 'posts.updated_at' },
//       { comment_id: 'comments.id' },
//       { comment_body: 'comments.body' },
//       { comment_post_id: 'comments.post_id' },
//       { comment_user_id: 'comments.user_id' },
//       { comment_created_at: 'comments.created_at' },
//       { comment_updated_at: 'comments.updated_at' },
//     );
// }

// function fetchAllWithComments(userId) {
//   return knex(TABLE_NAME)
//     .innerJoin(COMMENT_TABLE, `${TABLE_NAME}.id`, `${COMMENT_TABLE}.post_id`)
//     .select(
//       sh.gsc('posts.id'),
//       sh.gsc('posts.title'),
//       sh.gsc('posts.body'),
//       sh.gsc('posts.user_id'),
//       sh.gsc('posts.created_at'),
//       sh.gsc('posts.updated_at'),
//       sh.gsc('comments.id'),
//       sh.gsc('comments.body'),
//       sh.gsc('comments.post_id'),
//       sh.gsc('comments.user_id'),
//       sh.gsc('comments.created_at'),
//       sh.gsc('comments.updated_at'),
//     )
// }

function fetch(id, userId) {
  return knex(TABLE_NAME)
    .select()
    .where({ id, user_id: userId })
    .limit(1)
    .then(posts => posts[0]);
}

// function fetchWithComments(id, userId) {
//   return knex(TABLE_NAME)
//     .join(COMMENT_TABLE, `${TABLE_NAME}.id`, '=', `${COMMENT_TABLE}.post_id`)
//     .select()
//     .where({ id })
//     .limit(1)
//     .then(posts => posts[0]);
// }

function create(reqData, userId) {
  const { title, body } = reqData;
  return knex(TABLE_NAME).insert({ title, body, author_id: userId });
}

function update(id, reqData, userId) {
  const { title, body } = reqData;
  return knex(TABLE_NAME)
    .update({ title, body })
    .where({ id, author_id: userId });
}

function remove(id, userId) {
  return knex(TABLE_NAME)
    .del()
    .where({ id, author_id: userId });
}

module.exports = {
  fetchAll,
  // fetchAllWithComments,
  fetch,
  // fetchWithComments,
  create,
  update,
  remove,
};
