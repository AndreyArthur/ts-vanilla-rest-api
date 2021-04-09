export default {
  users: process.env.NODE_ENV === 'test'
    ? 'users.test'
    : 'users',
};
