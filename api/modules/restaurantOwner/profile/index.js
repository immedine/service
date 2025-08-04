'use strict';

/**
 * This module handles all functionality of profile portion in restaurantOwner
 * @module Modules/RestaurantOwner/Profile
 */

module.exports = function (app) {
  /**
   * Sets the profile data of the restaurantOwner
   * @param  {Object}  restaurantOwnerDoc                      The restaurantOwner document
   * @param  {Object}  profileData                   The profile data object
   * @param  {String}  profileData.firstName         The first name
   * @param  {String}  profileData.lastName          The last name
   * @param  {String}  profileData.email             The email address
   * @return {Promise}                               The promise
   */
  const setProfile = function (restaurantOwnerDoc, profileData) {

    if (profileData.firstName) {
      restaurantOwnerDoc.personalInfo.firstName = profileData.firstName;
    }
    if (profileData.lastName) {
      restaurantOwnerDoc.personalInfo.lastName = profileData.lastName;
    }
    if (profileData.email) {
      profileData.email = profileData.email.toLowerCase();
      restaurantOwnerDoc.personalInfo.email = profileData.email;
    }
    console.log("restaurantOwnerDoc ", restaurantOwnerDoc, profileData)
    return app.models.RestaurantOwner.countDocuments({
      'personalInfo.email': profileData.email,
      _id: {
        $ne: restaurantOwnerDoc._id,
      },
    }).then((output) =>
      output
        ? Promise.reject({
            errCode: 'RESTAURANT_OWNER_EMAIL_ALREADY_EXISTS',
          })
        : restaurantOwnerDoc.save().then((restaurantOwner) => {
            // if (oldProfilePicture) {
            //   app.utility.removeFile(oldProfilePicture);
            // }
            return restaurantOwner;
          })
    );
  };

  /**
   * Changes the user password
   * @param  {Object}  restaurantOwnerDoc    The restaurantOwner document
   * @param  {String}  oldPassword The old password
   * @param  {String}  newPassword The new password
   * @return {Promise}             The promise
   */
  const changePassword = function (restaurantOwnerDoc, oldPassword, newPassword) {
    return app.utility
      .validatePassword(oldPassword, restaurantOwnerDoc.authenticationInfo.password)
      .then((isValid) =>
        isValid
          ? app.utility.encryptPassword(newPassword)
          : Promise.reject({
              errCode: 'PASSWORD_MISMATCH',
            })
      )
      .then((password) => {
        restaurantOwnerDoc.authenticationInfo.password = password;
        return restaurantOwnerDoc.save();
      });
  };

  /**
   * Logout function for restaurantOwner
   * @param  {Object}  headerData            The header data
   * @param  {String}  headerData.token      The auth token
   * @param  {Number}  headerData.deviceType The device type
   * @param  {String}  headerData.deviceId   The device id
   * @return {Promise}                       The promise
   */
  const logout = function (headerData) {
    return app.module.session.kill(
      headerData.token,
      headerData.deviceType,
      headerData.deviceId,
      app.config.user.role.restaurantOwner
    );
  };

  return {
    set: setProfile,
    changePassword: changePassword,
    logout: logout,
  };
};
