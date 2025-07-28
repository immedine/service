'use strict';

module.exports = {
  defaultLanguage: 'en-us',
  languages: ['en-us', 'fr'],
  'en-us': {
    push: {},
    inApp: {
      toEmployer: {
        interestedUser: {
          body: () => `A new candidate has interested to your jobpost, Check it out!`,
        },
        interestedAgency: {
          body: () => `A new agency has interested to your jobpost, Check it out!`,
        },
      },
      toAgency: {
        interestedUser: {
          body: () => `A new candidate has interested to you for getting hire, Check it out!`,
        },
        interestedEmployer: {
          body: () => `A new employer has interested to you for hiring candidate of on demand jobpost, Check it out!`,
        },
      },
      toUser: {
        interestedAgency: {
          body: () => `A new agency has interested to you for hiring on demand jobpost, Check it out!`,
        },
        interestedEmployer: {
          body: () => `A new employer has interested to you for hiring on fulltime jobpost, Check it out!`,
        },
      },
    },

    email: {
      copyRightText: 'Copyright (c) RA-System',
      forgotPassword: {
        subject: 'ROODS - Reset Password OTP',
        greeting: 'Hi',
        message:
          'You recently requested OTP to reset your password for your ROODS account. Use the OTP below to reset it.',
        otpText: 'OTP',
      },
      userSignupOTP: {
        subject: `ROODS - OTP for signup`,
        greeting: 'Hi',
        message: 'You recently requested OTP to signup for your ROODS account. Use the OTP below to signup it.',
        otpText: 'OTP',
      },
      user: {
        signupConfirmation: {
          subject: (name) => `ROODS - Confirmation as Candidate ${name}`,
          greeting: 'Hi',
          message:
            'Your candidate account has been successfully created. Use the link and credentials below to access it.',
          loginLink: process.env.CANDIDATE_LOGIN_LINK || '',
        },
      },
      employer: {
        signupConfirmation: {
          subject: (name) => `ROODS - Confirmation as Employer ${name}`,
          greeting: 'Hi',
          message:
            'Your employer account has been successfully created by Admin. Use the link and credentials below to access it.',
          loginLink: process.env.EMPLOYER_LOGIN_LINK || '',
        },
      },
      agency: {
        signupConfirmation: {
          subject: (name) => `ROODS - Confirmation as Agency ${name}`,
          greeting: 'Hi',
          message:
            'Your agency account has been successfully created by Admin. Use the link and credentials below to access it.',
          loginLink: process.env.AGENCY_LOGIN_LINK || '',
        },
      },
    },
    sms: {
      mobileVerification: {
        body: (otp) => `Hi! Welcome to RA-System. Your mobile verification One Time Password is ${otp}.`,
      },
      loginOTP: {
        body: (otp) => `Hi! use this One Time Password ${otp}, to log in to your RA-System account.`,
      },
    },
  },
};
