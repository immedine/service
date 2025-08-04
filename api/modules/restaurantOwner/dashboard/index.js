'use strict';

/**
 * This module handles all functionality of dashboard portion in admin
 * @module Modules/Admin/Dashboard
 */

module.exports = function(app) {
  const Category = app.models.Category;
  const Menu = app.models.Menu;

  const getStats = (restaurantId) => {
    return Promise.all([
        Category.countDocuments({
          restaurantRef: restaurantId,
          status: { $nin: [
              app.config.contentManagement.category.deleted,
            ], },
        }).exec(),
        Menu.countDocuments({
          restaurantRef: restaurantId,
          status: { $nin: [
              app.config.contentManagement.menu.deleted,
            ], },
        }).exec(),
      ]).spread((totalCategories, totalMenu) => {
        return {
          totalCategories,
          totalMenu
        };
      });
    
  };
  return { getStats };
};