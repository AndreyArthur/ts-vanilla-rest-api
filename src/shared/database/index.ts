interface ITables {
  users: string;
  posts: string;
}

export default ((): ITables => {
  if (process.env.NODE_ENV === 'test') {
    return {
      users: 'users.test',
      posts: 'posts.test',
    };
  }

  return {
    users: 'users',
    posts: 'posts',
  };
})();
