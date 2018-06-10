const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

/* TO-DO
 * Authorization role based in JWT
*/
module.exports = app => {
  const User = app.database.models.User;
  const config = app.libs.config;

  const params = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
  };

  const strategy = new Strategy(params, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);

      if (user) {
        return done(null, { id: user.id, email: user.email });
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, null);
    }
  });

  passport.use(strategy);
  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate('jwt', config.jwtSession);
    }
  };
};
