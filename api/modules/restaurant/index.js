'use strict';

/**
 * This module handles all functionality of Admin Restaurant
 * @module Modules/Restaurant
 */
module.exports = function (app) {


  /**
   * restaurant Model
   * @type {Mongoose.Model}
   */
  const Restaurant = app.models.Restaurant;

  /**
   * Creates a Restaurant
   * @param  {Object} config  The config object
   * @return {Promise}        The promise
   */
  const createRestaurant = function (config) {
    return Restaurant.createRestaurant(config);
  };

  /**
   * Fetches a restaurant by Id
   * @param  {String} restaurantId  The restaurant id
   * @return {Promise}        The promise
   */
  const findRestaurantById = function (restaurantId) {
    return Restaurant.findById(restaurantId);
  };

  /**
   * Edits a restaurant
   * @param  {Object} editedRestaurant The edited restaurant document
   * @return {Promise}           The promise
   */
  const editRestaurant = function (editedRestaurant) {
    return Restaurant.countDocuments({
      name: editedRestaurant.name,
      status: app.config.contentManagement.restaurant.active,
      _id: {
        $ne: editedRestaurant._id
      }
    })
      .then(count => count ? Promise.reject({
        'errCode': 'RESTAURANT_ALREADY_EXISTS'
      }) : editedRestaurant.save());
  };

  /**
   * Fetches a list of categories
   * @param  {Object} options  The options object
   * @return {Promise}        The promise
   */
  const getList = function (options) {
    return Restaurant.pagedFind(options);
  };

  /**
   * Removes a restaurant
   * @param  {Object} restaurant The restaurant document
   * @return {Promise}     The promise
   */
  const removeRestaurant = function (restaurant) {
    return Restaurant.removeRestaurant(restaurant._id);
  };

  const editMyRestaurant = (restaurantId, data) => {
    return Restaurant.findById(restaurantId)
      .then(restaurant => {
        if (!restaurant) {
          return Promise.reject({
            'errCode': 'RESTAURANT_NOT_FOUND'
          });
        }
        restaurant.set(data);
        return restaurant.save();
      });
  };


  return {
    'create': createRestaurant,
    'get': findRestaurantById,
    'edit': editRestaurant,
    'list': getList,
    'remove': removeRestaurant,
    'set': editMyRestaurant
  };
};