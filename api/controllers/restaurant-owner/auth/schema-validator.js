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
    token: {
      type: 'string',
      required: true,
      allowEmpty: false,
    },
    password: {
      type: 'string',
      required: true,
      allowEmpty: false,
    },
  };

  const socialLogin = {
    provider: {
      type: 'string',
      required: true,
      allowEmpty: false,
      enum: ['google'],
    },
    socialId: {
      type: 'string',
      required: true,
      allowEmpty: false,
    },
    fullName: {
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
    signup: signup,
    socialLogin
  };
};
