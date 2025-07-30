'use strict';
/**
 * This Controller handles all functionality of admin user
 * @module Controllers/Admin/user
 */
module.exports = function(app) {

  /**
   * user module
   * @type {Object}
   */
  const user = app.module.user;

  /**
   * Fetches a user
   * @param  {Object}   req  Request 
   * @param  {Object}   res  Response
   * @param  {Function} next Next is used to pass control to the next middleware function
   * @return {Promise}       The Promise
   */
  const getUser = (req, res, next) => {
    user.details(req.params.userId)
      .then(output => {
        req.workflow.outcome.data = output;
        req.workflow.emit('response');
      })
      .catch(next);
  };

  /**
   * Fetches a list of categories
   * @param  {Object}   req  Request 
   * @param  {Object}   res  Response
   * @param  {Function} next Next is used to pass control to the next middleware function
   * @return {Promise}       The Promise
   */
  const getUserList = (req, res, next) => {
    let query = {
      skip: Number(req.query.skip) || app.config.page.defaultSkip,
      limit: Number(req.query.limit) || app.config.page.defaultLimit,
      filters: {},
      sort: {
        createdAt: -1
      },
      keys: "personalInfo accountStatus createdAt"
    };

    if (req.body.filters) {
      let { firstName, lastName, email } = req.body.filters;
      if (firstName) {
        query.filters.personalInfo.firstName = new RegExp(`^${firstName}`, 'ig');
      }
      if (lastName) {
        query.filters.personalInfo.lastName = new RegExp(`^${lastName}`, 'ig');
      }
      if (email) {
        query.filters.personalInfo.email = new RegExp(`^${email}`, 'ig');
      }
    }
    if (req.body.sortConfig) {
      let { firstName } = req.body.sortConfig;
      if (firstName) {
        query.sort.firstName = firstName;
      }
    }

    user.getAll(query)
      .then(output => {
        req.workflow.outcome.data = output;
        req.workflow.emit('response');
      })
      .catch(next);
  };


  return {
    get: getUser,
    list: getUserList,
  };

};