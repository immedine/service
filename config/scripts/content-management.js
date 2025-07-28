'use strict';

const category = require("../../db/models/category");

module.exports = {
  category: {
    active: 1,
    deleted: 2
  },
  menu: {
    active: 1,
    deleted: 2
  },
  restaurant: {
    active: 1,
    deleted: 2
  },
  language: {
    active: 1,
    deleted: 2
  },
  faq: {
    active: 1,
    deleted: 2
  }
};