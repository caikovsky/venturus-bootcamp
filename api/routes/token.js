const jwt = require('jwt-simple');

module.exports = app => {
  const User = app.database.models.User;
  const config = app.libs.config;

  app.post('/token', async (req, res) => {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (user) {
      if (User.isPassword(user.password, req.body.password)) {
        const payload = {
          id: user.id
        };

        res.json({
          token: jwt.encode(payload, config.jwtSecret)
        });
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  });
};
