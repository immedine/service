'use strict';

/**
 * This Controller handles all functionality of Global Config
 * @module Controllers/Admin/Restaurant
 */
module.exports = function (app) {
  /**
   * admin module
   * @type {Object}
   */
  const restaurant = app.module.restaurant;
  /**
   * Edit Restaurant
   * @param  {Object}   req  Request
   * @param  {Object}   res  Response
   * @param  {Function} next Next is used to pass control to the next middleware function
   * @return {Promise}       The Promise
   */
  const editRestaurant = (req, res, next) => {
    restaurant
      .set(req.session.user.restaurantRef, req.body)
      .then((output) => {
        req.workflow.outcome.data = output;

        req.workflow.emit('response');
      })
      .catch(next);
  };

  /**
   * Fetch Restaurant details
   * @param  {Object}   req  Request
   * @param  {Object}   res  Response
   * @param  {Function} next Next is used to pass control to the next middleware function
   * @return {Promise}       The Promise
   */
  const getRestaurantDetails = (req, res, next) => {
    restaurant
      .get(req.session.user.restaurantRef)
      .then((output) => {
        req.workflow.outcome.data = output;

        req.workflow.emit('response');
      })
      .catch(next);
  };

  return {
    edit: editRestaurant,
    get: getRestaurantDetails,
  };
};
