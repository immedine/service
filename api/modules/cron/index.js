'use strict';

module.exports = function(app) {


  const bulkUploadCron = require('./scripts/bulkUploadCron');
  const updateNewStory = require('./scripts/updateNewStory');


  function executeCron() {
    // bulkUploadCron(app);
    // updateNewStory(app);
  }
  return executeCron;
};