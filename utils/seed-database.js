'use strict';

const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config');
const Daily = require('../db/models/daily');
const User = require('../db/models/user');

const seedDaily = require('../db/seed/daily');
const seedUsers = require('../db/seed/users');



mongoose.connect(MONGODB_URI)
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Promise.all([
      Note.insertMany(seedNotes),
      Folder.insertMany(seedFolders),
      Folder.createIndexes(),
      Tag.insertMany(seedTags),
      Tag.createIndexes(),
      User.insertMany(seedUsers),
      User.createIndexes(),
    ]);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });