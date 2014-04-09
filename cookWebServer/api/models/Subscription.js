/**
 * Subscription
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */




module.exports = {

  attributes: {

    subscriber: {
      model: 'user'
    },

    subscriberPayee: {
      model: 'user'
    }

  }

};
