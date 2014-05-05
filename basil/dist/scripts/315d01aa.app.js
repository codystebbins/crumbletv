"use strict";

var app = angular.module("basilApp", [
  "ngCookies",
  "ngSanitize",
  "ui.router",
  "restangular"
]).config(function ($stateProvider, $urlRouterProvider) {
  // Unmatched state goes to root
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "views/main.html",
      controller: "mainController"
    })
    .state("stream", {
      url: "/stream",
      templateUrl: "views/stream.html",
      controller: "streamController"
    })
    .state("sign-up", {
      url: "/sign-up",
      templateUrl: "views/sign-up.html",
      controller: "signUpController"
    });

});

app.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://localhost:1337');

  RestangularProvider.setResponseExtractor(function(response, operation) {
    // extracts data
    return response.data;
  });

  RestangularProvider.setDefaultHttpFields({cache: true});

  RestangularProvider.setDefaultHeaders({
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  });

  //RestangularProvider.setExtraFields(['name']);
  /*
  RestangularProvider.addElementTransformer('accounts', false, function(element) {
    element.accountName = 'Changed';
    return element;
  });
  */

  //RestangularProvider.setMethodOverriders(["put", "patch"]);

  // In this case we are mapping the id of each element to the _id field.
  // We also change the Restangular route.
  // The default value for parentResource remains the same.
  /*
  RestangularProvider.setRestangularFields({

    id: "_id",
    route: "restangularRoute",
    selfLink: "self.href"
  });
  */

  //RestangularProvider.setRequestSuffix('.json');

  // Use Request interceptor
  /*
  RestangularProvider.setRequestInterceptor(function(element, operation, route, url) {
    delete element.name;
    return element;
  });
    */

  // ..or use the full request interceptor, setRequestInterceptor's more powerful brother!
  /*
  RestangularProvider.setFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {
    delete element.name;
    return {
      element: element,
      params: _.extend(params, {single: true}),
      headers: headers,
      httpConfig: httpConfig
    };
  });
  */
});