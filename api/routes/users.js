const { body, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');

module.exports = app => {
  const User = app.database.models.User;

  app.post(
    '/users',
    [
      body('name', 'Name field is required').exists(),
      body('name', 'Invalid length')
        .trim()
        .isLength({ min: 1, max: 255 }),
      body('email', 'Email field is required').exists(),
      body('email', 'Invalid email').isEmail(),
      body('password', 'Password field is required').exists(),
      body('password', 'Invalid password length')
        .trim()
        .isLength({ min: 8, max: 12 })
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const userExists = await User.findOne({
          where: {
            email: req.body.email
          }
        });

        if (userExists) {
          return res.status(409).json({
            msg: 'Email has already been used'
          });
        }

        let user = await User.create(matchedData(req));

        user = await User.findById(user.id, {
          attributes: ['id', 'name', 'email', 'created_at', 'updated_at']
        });

        res.json(user);
      } catch (error) {
        console.log(error); //TO-DO -> Log to a file
        res.status(500).json({ msg: 'Unexpected error' });
      }
    }
  );
};
