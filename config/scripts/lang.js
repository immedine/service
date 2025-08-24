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
        subject: 'ImmeDine - Reset Password',
        greeting: 'Hi',
        message:
          'You recently requested to reset your password for your ImmeDine account. Click on the button below to reset your password.',
        otpText: 'OTP',
      },
      sendVerificationLink: {
        subject: 'ImmeDine - Verify Account',
        greeting: 'Hi',
        message:
          'You recently requested to send the verification link for your ImmeDine account. Click on the button below to verify your account.',
        otpText: 'OTP',
      },
      userSignupRequest: {
        subject: `ImmeDine - Signup Verification`,
        greeting: 'Hi',
        message: 'You recently requested to signup for your ImmeDine account. Click on the button below to verify your account.',
        otpText: 'OTP',
      },
      restaurantOwnerAddedByAdmin: {
        subject: `ImmeDine - Owner Created`,
        greeting: 'Hi',
        message: 'You have been added as a Restaurant Owner for your restaurant in ImmeDine. To access your account please click on the button below and use below credentials to login.',
        emailText: "Email",
        passwordText: "Password",
      },
      owner: {
        signupConfirmation: {
          subject: (name) => `ImmeDine - Confirmation as Candidate ${name}`,
          greeting: 'Hi',
          message:
            'Your candidate account has been successfully created. Use the link and credentials below to access it.',
          loginLink: process.env.CANDIDATE_LOGIN_LINK || '',
        },
      },
      employer: {
        signupConfirmation: {
          subject: (name) => `ImmeDine - Confirmation as Employer ${name}`,
          greeting: 'Hi',
          message:
            'Your employer account has been successfully created by Admin. Use the link and credentials below to access it.',
          loginLink: process.env.EMPLOYER_LOGIN_LINK || '',
        },
      },
      agency: {
        signupConfirmation: {
          subject: (name) => `ImmeDine - Confirmation as Agency ${name}`,
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
