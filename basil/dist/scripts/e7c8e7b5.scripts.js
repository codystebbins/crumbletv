"use strict";var app=angular.module("basilApp",["ngCookies","ngSanitize","ui.router","restangular"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise(function(a,b){b.path("/")}),b.when("stream","/stream"),a.state("home",{url:"/",templateUrl:"views/main.html",controller:"mainController"}).state("stream",{url:"/stream",templateUrl:"views/stream.html",controller:"streamController"}).state("sign-up",{url:"/sign-up",templateUrl:"views/sign-up.html",controller:"signUpController"}).state("subscribe",{url:"/subscribe",templateUrl:"views/subscribe.html",controller:"subscribeController"}).state("login",{url:"/login",templateUrl:"views/login.html",controller:"loginController"})}]);app.config(["RestangularProvider",function(a){a.setBaseUrl("http://localhost:1337"),a.setResponseExtractor(function(a){return a.data}),a.setDefaultHttpFields({cache:!0}),a.setDefaultHeaders({"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"})}]),angular.module("basilApp").controller("menuController",["$scope",function(a){a.name="Evan"}]),angular.module("basilApp").controller("mainController",["$scope","facetService",function(a,b){b.getListGroupedByParentFacet().then(function(b){a.facets=b}),a.facetService=b,a.subscriptions=["Evan","Jace","Thomas","Janella","Evan's Mom","Carlo"],a.scheduledStreams=[{name:"Name 1",date:"November 13, 2014",attending:25},{name:"Name 2",date:"November 14, 2014",attending:9e3},{name:"Name 2",date:"November 14, 2014",attending:31}]}]),angular.module("basilApp").controller("streamController",["$scope",function(a){a.streamName="evan"}]),angular.module("basilApp").controller("signUpController",["$scope","Restangular",function(a,b){a.fname="",a.email="",a.password="",a.success="FALSE",a.createUser=function(){var c={name:a.fname,email:a.email,password:a.password};b.all("User").post(c).then(function(b){console.log(b),a.success="TRUE"})}}]),angular.module("basilApp").controller("subscribeController",["$scope","Restangular",function(a,b){a.username="",a.subTo="",a.success="FALSE",a.createSubscription=function(){var c={subscriber:a.username,subscriberPayee:a.subTo};console.log(c),b.all("Subscription").post(c).then(function(b){console.log(b),a.success="TRUE"})}}]),angular.module("basilApp").controller("loginController",["$scope","Restangular",function(a,b){a.email="",a.password="",a.success="FALSE",a.login=function(){var c={email:a.email,password:a.password};b.all("User/login").post(c).then(function(){a.success="TRUE"})}}]),angular.module("basilApp").service("facetService",["Restangular","$q",function(a,b){function c(){return g.getList()}function d(){var a=b.defer();return c().then(function(b){a.resolve(_.groupBy(b,function(a){return a.parent_facet}))}),a.promise}function e(a){return f[a]}var f,g=a.all("facet");return d().then(function(a){f=_.indexBy(a[null],"id"),console.log(f)}),{getList:c,getListGroupedByParentFacet:d,getParentFacet:e}}]),angular.module("basilApp").directive("videoPlayer",[function(){function a(a){var b=angular.copy(c);return b.clip.url=a,b}var b="/static/flash/flowplayer",c={clip:{url:"cody",live:!0,provider:"influxis"},plugins:{influxis:{url:b+".rtmp-3.2.13.swf",netConnectionUrl:"rtmp://162.243.130.104:1935/videochat"}}};return{restrict:"C",scope:{name:"="},link:function(c,d){flowplayer(d[0],b+"-3.2.18.swf",a(c.name))}}}]);