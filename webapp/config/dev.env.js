'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  // auth enviornmnet variables
  CLIENT_ID: '"R4DSTDn7HdTpSDdWSy1f7iJfWOUsOMId"',
  CLIENT_DOMAIN: '"micahhauge.auth0.com"',
  REDIRECT: '"http://localhost:8080/callback"',
  SCOPE: '"openid profile"',
  AUDIENCE: '"https://startupbattle.com"',
})
