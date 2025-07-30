'use strict';

module.exports = function (app) {
  const globalConfig = app.module.globalConfig;
  const contactUs = app.module.contactUs;

  const getGlobalConfig = function (req, res, next) {
    // jshint ignore:line

    globalConfig
      .getGlobalConfigDoc()
      .then((output) => {
        req.workflow.outcome.data = output;
        req.workflow.emit('response');
      })
      .catch(next);
  };
  const getErrorCodes = function (req, res, next) {
    // jshint ignore:line

    let erroCodes = require('../../responseHandler/scripts/errorCodes')();

    req.workflow.outcome.data = erroCodes;
    req.workflow.emit('response');
  };

  const submitContactUs = function (req, res, next) {
    // jshint ignore:line

    contactUs
      .saveContactUsRequest(req.body)
      .then(() => req.workflow.emit('response'))
      .catch(next);
  };
  const getMasterData = function (req, res, next) {
    // jshint ignore:line

    globalConfig
      .getMasterData()
      .then((data) => {
        req.workflow.outcome.data = data;
        req.workflow.emit('response');
      })
      .catch(next);
  };

  return {
    getGlobalConfig: getGlobalConfig,
    getErrorCodes: getErrorCodes,
    submitContactUs: submitContactUs,
    getMasterData: getMasterData,
  };
};
