'use strict';

module.exports = function (app) {
  const auth = require('./auth')(app);
  const profile = require('./profile')(app);
  const { getAll } = require('./get')(app);
  const details = require('./details')(app);

  return {
    auth,
    profile,
    getAll,
    details,
  };
};
