'use strict';

module.exports = function(app) {
  const init = require('./init');
  const globalConfig = require('./globalConfig')(app);
  const session = require('./session')(app);
  const admin = require('./admin')(app);
  const restaurantOwner = require('./restaurantOwner')(app);
  const user = require('./user')(app);
  const notification = require('./notification')(app);
  const adminUser = require('./adminUser')(app);
  const role = require('./role')(app);
  const language = require('./language')(app);
  const category = require('./category')(app);
  const restaurant = require('./restaurant')(app);
  const faq = require('./faq')(app);
  const menu = require('./menu')(app);
  const cron = require('./cron')(app)();

  return {
    init,
    globalConfig,
    session,
    admin,
    restaurantOwner,
    restaurant,
    user,
    notification,
    adminUser,
    role,
    language,
    category,
    faq,
    cron,
    menu
  };
};