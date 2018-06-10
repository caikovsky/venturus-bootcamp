module.exports = {
  database: 'bootcamp',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: 'bootcamp.sqlite',
    define: {
      underscored: true
    }
  },
  jwtSecret: 'secret',
  jwtSession: {
    session: false
  }
};
