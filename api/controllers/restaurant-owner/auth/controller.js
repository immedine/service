'use strict';

/**
 * This Controller handles all functionality of restaurantOwner auth
 * @module Controllers/RestaurantOwner/Auth
 */
module.exports = function (app) {
  /**
   * restaurantOwner module
   * @type {Object}
   */
  const restaurantOwner = app.module.restaurantOwner;
  const restaurant = app.module.restaurant;

  /**
   * Login
   * @param  {Object}   req  Request
   * @param  {Object}   res  Response
   * @param  {Function} next Next is used to pass control to the next middleware function
   * @return {Promise}       The Promise
   */
  const login = (req, res, next) => {
    restaurantOwner.auth
      .login(
        {
          deviceType: req.headers['x-auth-devicetype'],
          deviceId: req.headers['x-auth-deviceid'],
        },
        {
          email: req.body.email,
          password: req.body.password,
        }
      )
      .then((output) =>
        app.module.session.set(
          output.userType,
          output.userDoc,
          req.headers['x-auth-devicetype'],
          req.headers['x-auth-deviceid'],
          req.headers['x-auth-notificationkey']
        )
      )
      .then((output) => {
        req.workflow.outcome.data = {
          accessToken: output.accessToken,
          refreshToken: output.refreshToken,
          user: app.utility.format.user(output.userId),
        };
        req.workflow.emit('response');
      })
      .catch(next);
  };

  /**
   * Forgot Password - Request OTP
   * @param  {Object}   req  Request
   * @param  {Object}   res  Response
   * @param  {Function} next Next is used to pass control to the next middleware function
   * @return {Promise}       The Promise
   */
  const forgotPasswordRequestOTP = (req, res, next) => {
    restaurantOwner.auth.forgotPassword
      .create(req.body.email)
      .then((output) => {
        if (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'development') {
          req.workflow.outcome.data = {};
          req.workflow.outcome.data.otp = output.code;
        }

        req.workflow.emit('response');
      })
      .catch(next);
  };

  /**
   * Forgot Password - Verify OTP
   * @param  {Object}   req  Request
   * @param  {Object}   res  Response
   * @param  {Function} next Next is used to pass control to the next middleware function
   * @return {Promise}       The Promise
   */
  const forgotPasswordVerifyOTP = (req, res, next) => {
    restaurantOwner.auth.forgotPassword
      .verify(req.body.token, req.body.password)
      .then((output) => req.workflow.emit('response'))
      .catch(next);
  };

  const signupRequest = (req, res, next) => {
    restaurant.create({
      name: req.body.restaurantDetails.name,
      introductoryText: req.body.restaurantDetails.introductoryText
    })
      .then((output) => {
        // req.workflow.outcome.data = output;
        restaurantOwner.crud.add({
          personalInfo: {
            fullName: req.body.ownerDetails.fullName,
            phone: req.body.ownerDetails.phone,
            email: req.body.ownerDetails.email,
            password: req.body.ownerDetails.password
          },
          restaurantRef: output._id,
          from: 'signup'
        })
        .then(() => {
          req.workflow.emit('response');
        })
        .catch(next);
      })
      .catch(next);
  };

  const verifyToken = (req, res, next) => {
    const {token} = req.query;
    restaurantOwner.auth
      .verifyToken(token)
      .then((output) => {
        req.workflow.outcome.data = app.utility.format.user(output);
        req.workflow.emit('response');
      })
      .catch(next);
  };

  return {
    login: login,
    forgotPassword: {
      requestOTP: forgotPasswordRequestOTP,
      verifyOTP: forgotPasswordVerifyOTP,
    },
    verifyToken: verifyToken,
    signupRequest: signupRequest
  };
};
