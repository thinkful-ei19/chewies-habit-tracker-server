'use strict';

module.exports = {
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'https://chewies-daily-tracker.netlify.com',
  DATABASE_URL:
        process.env.DATABASE_URL || 'mongodb://userOne:passwordOne@ds157639.mlab.com:57639/chewies-daily-tracker',
  TEST_DATABASE_URL:
        process.env.TEST_DATABASE_URL ||
        'mongodb://localhost/thinkful-backend-test',
  JWT_SECRET: process.env.JWT_SECRET || 'almond-latte',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d'

  // DATABASE_URL:
  //     process.env.DATABASE_URL || 'postgres://localhost/thinkful-backend',
  // TEST_DATABASE_URL:
  //     process.env.TEST_DATABASE_URL ||
  //     'postgres://localhost/thinkful-backend-test'
};
//http://hungry-perlman-bc73ed.netlify.com