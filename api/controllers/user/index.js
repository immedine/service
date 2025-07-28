'use strict';
const expressRouter = require('express').Router;

const controllers = {
  auth: require('./auth/route'),
  common: require('./common/route'),
  profile: require('./profile/route'),
  category: require('./category/route'),
  language: require('./language/route'),
};
module.exports = function(app) {
  const options = {
    upload: app.utility.upload,
    validateBody: app.utility.apiValidate.body,
    validateQuery: app.utility.apiValidate.query,
    validateParams: app.utility.apiValidate.params,
    validateFile: app.utility.apiValidate.file,
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                                                               //
  // PUBLIC ROUTES                                                                                                                 //
  //                                                                                                                               //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const publicRouter = expressRouter();

  /**
   * Authentication API Gateway
   */
  publicRouter.use('/auth', controllers.auth(app, options));
  publicRouter.use('/category', controllers.category(app, options));


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                                                               //
  // PRIVATE ROUTES                                                                                                                //
  //                                                                                                                               //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const privateRouter = expressRouter();

  privateRouter.use('/common', controllers.common(app, options));
  privateRouter.use('/profile', controllers.profile(app, options));
  privateRouter.use('/language', controllers.language(app, options));
  privateRouter.use('/category', controllers.category(app, options));
  return {
    public: publicRouter,
    private: privateRouter,
  };
};