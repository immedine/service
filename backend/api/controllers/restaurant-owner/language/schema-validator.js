'use strict';

module.exports = function(app) {
  const addLanguage = {
    'name': {
      type: 'string',
      allowEmpty: false,
      required: true
    },
    'code': {
      type: 'string',
      allowEmpty: false,
      required: true
    },
  };

  const listQuery = {
    'skip': {
      type: 'string',
      'conform': function(value) {
        return app.utility.isValidate.isNumber(value);
      }
    },
    'limit': {
      type: 'string',
      'conform': function(value) {
        return app.utility.isValidate.isNumber(value);
      }
    }
  };

  const param = {
    'languageId': {
      type: 'string',
      required: true,
      'conform': function(value) {
        return app.utility.checkMongooseObjectId(value);
      }
    }
  };

  const list = {
    'sortConfig': {
      type: 'object',
      properties: {
        'name': {
          type: 'number',
          enum: [1, -1]
        }
      }
    },
    'filters': {
      type: 'object',
      properties: {
        'name': {
          type: 'string',
          allowEmpty: false
        },
        'moduleName': {
          type: 'string',
          allowEmpty: false
        },
      }
    }
  };

  return {
    add: addLanguage,
    edit: addLanguage,
    listQuery: listQuery,
    param: param,
    list: list,
  };

};