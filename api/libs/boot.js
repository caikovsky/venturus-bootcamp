module.exports = app => {
  app.database.sequelize.sync({ force: true }).done(() => {
    app.listen(app.get('PORT'), () => {
      console.log(`Listening on localhost:${app.get('PORT')}`);
    });
  }); //not use `force: true` in prod
};
