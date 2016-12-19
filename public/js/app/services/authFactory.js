angular.module('Roundup')
.factory('Auth', ['$window', function($window) {
  return {
    saveToken: function(token) {
      $window.localStorage['secret-token'] = token;
    },
    getToken: function() {
      return $window.localStorage['secret-token'];
    },
    removeToken: function() {
      $window.localStorage.removeItem('secret-token');
    },
    isLoggedIn: function() {
      var token = this.getToken();
      var result = token ? true : false;
      console.log("is logged in?", result);
      return result;
    },
    // {{WhateverCtrl.Auth.currentUser()._doc.email}}
    currentUser: function() {
      console.log("currentUser()")
      if (this.isLoggedIn()) {
        console.log("user is logged in");
        var token = this.getToken();
        console.log('token: ', token);
        try {
          var payload = JSON.parse($window.atob(token.split('.')[1]));
          //var payload = payload;
          console.log('the pay load', payload);
          return payload;
        } catch(err) {
          console.log('caught error in payload');
          return false;
        }
      }
    }
  }
}])

.factory('Alerts', [function() {
  var alerts = [];
  return {
    clear: function() {
      alerts = [];
    },
    add: function(type, msg) {
      alerts.push({type: type, msg: msg});
    },
    get: function() {
      return alerts;
    },
    remove: function(idx) {
      alerts.splice(idx, 1);
    }
  }
}])

.factory('AuthInterceptor', ['Auth', function(Auth) {
  // if querying other APIs, add URLs to this array

  return {
    request: function(config) {
      var token = Auth.getToken();
      var excludedEndpoint = excludedEndpoints.indexOf(config.url) > -1;
      if (token && !excludedEndpoint) {
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }
  }
}])
