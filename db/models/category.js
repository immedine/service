'use strict';
module.exports = function(app, mongoose) {
  const schema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: app.config.contentManagement.category.active
    },
    restaurantRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RestaurantOwner',
      required: true
    },
    totalMenu: {
      type: Number,
      default: 0
    }
  }, {
    versionKey: false,
    timestamps: true,
  });


  /**
   * this function is to add new category
   * @param  {String} name          name of the category
   * @param  {String} colorCode     colorCode of the category
   * @param  {String} categoryType  categoryType of the category
   * @return {Promise}            
   */
  schema.statics.createCategory = function (data) {
    const { name, restaurantRef } = data;
    return this.exist(name, restaurantRef)
      .then((doc) => doc ? Promise.reject({
        'errCode': 'CATEGORY_ALREADY_EXISTS'
      }) : (new this(data)).save());

  };
  /**
   * this is to check if any category exists with the name
   * @param  {String} name name of the category
   * @return {Promise}
   */
  schema.statics.exist = function (name, restaurantRef) {
    return this.countDocuments({
      name: name,
      status: app.config.contentManagement.category.active,
      restaurantRef: restaurantRef
    }).exec();
  };


  /**
   * this function is to remove category 
   * @param  {string} _id category id
   * @return {Promise}    Promise Object 
   */
  schema.statics.removeCategory = function (_id) {
    return this.findByIdAndRemove(_id).exec();
  };

  return schema;
};