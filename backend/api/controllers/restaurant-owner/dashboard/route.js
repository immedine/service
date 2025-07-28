'use strict';

///////////////////////////////////////////////////
// THIS IS THE ROUTE FILE FOR ADMIN DASHBOARD MODULE //
///////////////////////////////////////////////////

/**
 * The express router
 * @type {Express.Router}
 */
const router = require('express').Router();

/**
 * @param  {Express} app     The express app reference
 * @param  {Object}  options The options for this module
 * @return {Object}          The revealed module
 */
module.exports = function (app, options) {
  /**
   * The Controllers for these APIs
   * @type {Object}
   */
  const controllers = require('./controller')(app);

  /**
   * The Common Middlewares for these APIs
   * @type {Object}
   */
  // const commonMiddlewares = require("../../common/middleware")(app);

  /**
   * dashboard entity count
   */
  router.get('/stats', [
    controllers.home,
  ]);

  return router;
};
