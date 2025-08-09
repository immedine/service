'use strict';

module.exports = function (app) {
  const login = {
    email: {
      type: 'string',
      required: true,
      allowEmpty: false,
      format: 'email',
    },
    password: {
      type: 'string',
      required: true,
      allowEmpty: false,
    },
  };

  /////////////////////
  // Forgot Password //
  /////////////////////
  const forgotPasswordRequestOTP = {
    email: {
      type: 'string',
      required: true,
      allowEmpty: false,
      format: 'email',
    },
  };

  const forgotPasswordVerifyOTP = {
    email: {
      type: 'string',
      required: true,
      allowEmpty: false,
      format: 'email',
    },
    otp: {
      type: 'string',
      required: true,
      length: 4,
    },
    password: {
      type: 'string',
      required: true,
      allowEmpty: false,
    },
  };

  const signup = {
    ownerDetails: {
      firstName: {
        type: 'string',
        allowEmpty: false,
        required: true,
      },
      lastName: {
        type: 'string',
        allowEmpty: false,
        required: true,
      },
      email: {
        type: 'string',
        required: true,
        allowEmpty: false,
        format: 'email',
      },
      password: {
        type: 'string',
        required: true,
        allowEmpty: false,
      },
    },
    restaurantDetails: {
      name: {
        type: 'string',
        allowEmpty: false,
        required: true,
      },
      introductoryText: {
        type: 'string'
      },
    }

  };

  return {
    login: login,
    forgotPassword: {
      requestOTP: forgotPasswordRequestOTP,
      verifyOTP: forgotPasswordVerifyOTP,
    },
    signup: signup
  };
};
