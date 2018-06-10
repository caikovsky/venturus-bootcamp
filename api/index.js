const express = require('express');
const consign = require('consign');

const app = express();

consign()
  .include('libs/config.js')
  .then('database.js')
  .then('auth.js')
  .then('libs/middlewares.js') //init middlewares
  .then('routes') //init routes
  .then('libs/boot.js') //init server listen
  .into(app);
