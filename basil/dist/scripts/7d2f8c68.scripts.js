"use strict";var app=angular.module("basilApp",["ngCookies","ngSanitize","ui.router","restangular","ui.calendar"]).config(["$stateProvider","$urlRouterProvider","$sceDelegateProvider",function(a,b,c){c.resourceUrlWhitelist(["self","http://tlk.io/*"]),b.otherwise("/"),a.state("home",{url:"/",templateUrl:"views/main.html",controller:"mainController"}).state("watching",{url:"/watch/:name",templateUrl:"views/watch.html",controller:"watchController"}).state("category",{url:"/category",templateUrl:"views/category.html",controller:"categoryController"}).state("category.select",{url:"/category/:select",templateUrl:"views/category.select.html",controller:"categoryController"}).state("profile",{url:"/profile",templateUrl:"views/profile.html",controller:"profileController"}).state("sign-up",{url:"/sign-up",templateUrl:"views/sign-up.html",controller:"signUpController"}).state("subscribe",{url:"/subscribe",templateUrl:"views/subscribe.html",controller:"subscribeController"}).state("login",{url:"/login",templateUrl:"views/login.html",controller:"loginController"}).state("event",{url:"/event",templateUrl:"views/event.html",controller:"eventController"}).state("show",{url:"/show",templateUrl:"views/show.html",controller:"showController"}).state("recipe",{url:"/recipe",templateUrl:"views/recipe.html",controller:"recipeController"}).state("calendar",{url:"/calendar",templateUrl:"views/calendar.html",controller:"calendarController"}).state("stream",{url:"/stream",templateUrl:"views/stream.html",controller:"streamController"}).state("omelet",{url:"/omelet",templateUrl:"views/omelet.html",controller:"omeletController"}).state("session",{url:"/session",templateUrl:"views/session.html",controller:"sessionController"})}]);app.config(["RestangularProvider",function(a){a.setBaseUrl("http://localhost:1337"),a.setResponseExtractor(function(a){return a.data}),a.setDefaultHttpFields({cache:!0}),a.setDefaultHeaders({"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"})}]),angular.module("basilApp").controller("menuController",["$scope","authService","gravatarService","notificationService",function(a,b,c,d){a.name=!1,a.avatar=void 0,b.getName().then(function(b){a.name=b},function(){a.name=!1}),a.logout=function(){b.logout().then(function(){a.name=!1,a.avatar=void 0})},a.$watch(function(){return b.name},function(b){"undefined"!=typeof b&&null!==b&&(a.name=b,void 0==a.avatar&&0!=b&&c.getGravatar(b).then(function(b){a.avatar=b}))}),a.$watch(function(){return d.notification},function(b){console.log("notification changed!"),"undefined"!=typeof b&&null!==b&&(a.notification=b)})}]),angular.module("basilApp").controller("watchController",["$scope","$stateParams","gravatarService",function(a,b,c){a.streamName=b.name,a.avatar="http://placehold.it/100x100",a.chat="http://tlk.io/"+a.streamName,c.getGravatar(a.streamName,100).then(function(b){a.avatar=b})}]),angular.module("basilApp").controller("mainController",["$scope","facetService",function(a,b){b.getListGroupedByParentFacet().then(function(b){a.facets=b}),a.facetService=b,a.otherVideos=[{title:"Title 1",user:"username1",subs:55,thumb:"http://placehold.it/100x100"},{title:"Title 2",user:"username2",subs:64,thumb:"http://placehold.it/100x100"},{title:"Title 3",user:"username3",subs:9001,thumb:"http://placehold.it/100x100"}],a.subscriptions=["Evan","Jace","Thomas","Janella","Evan's Mom","Carlo"],a.scheduledStreams=[{name:"Name 1",date:"November 13, 2014",attending:25},{name:"Name 2",date:"November 14, 2014",attending:9e3},{name:"Name 2",date:"November 14, 2014",attending:31}]}]),angular.module("basilApp").controller("streamController",["$scope",function(a){a.streamName="evan"}]),angular.module("basilApp").controller("signUpController",["$scope","$state","Restangular",function(a,b,c){a.name="",a.email="",a.password="",a.success="FALSE",a.createUser=function(){var d={name:a.name,email:a.email,password:a.password};c.all("User").post(d).then(function(c){console.log(c),a.success="TRUE",b.go("login")},function(a){alert("Something went wrong",a)})}}]),angular.module("basilApp").controller("subscribeController",["$scope","Restangular",function(a,b){a.username="",a.subTo="",a.success="FALSE",a.createSubscription=function(){var c={subscriber:a.username,subscriberPayee:a.subTo};console.log(c),b.all("Subscription").post(c).then(function(b){console.log(b),a.success="TRUE"})}}]),angular.module("basilApp").controller("loginController",["$scope","Restangular","gravatarService","authService",function(a,b,c,d){a.email="",a.password="",a.success="FALSE",a.avatar="http://placehold.it/80x80",a.login=function(){var e={email:a.email,password:a.password};b.all("User/login").post(e).then(function(b){a.success="TRUE",console.log(b),d.authenticate(a.email,a.password).then(function(b){c.getGravatar(b.name).then(function(b){a.avatar=b}),a.success="SUCCESS"},function(){console.log("Could not authenticate"),alert("Incorrect username or Password!")})})}}]),angular.module("basilApp").controller("eventController",["$scope","Restangular",function(a,b){a.eventTitle="",a.startDate="",a.endDate="",a.ownerID=2,a.showID=1,a.success="FALSE",a.createEvent=function(){var c={title:a.eventTitle,owner:a.ownerID,show:a.showID,startDate:a.startDate,endDate:a.endDate};b.all("Event").post(c).then(function(b){a.success="TRUE",console.log(b)})}}]),angular.module("basilApp").controller("calendarController",["$scope","Restangular",function(a,b){var c=new Date,d=(c.getDate(),c.getMonth()),e=c.getFullYear();a.events=[];var f={owner:3};b.one("Show/findme").get(f).then(function(b){for(var c=0;c<b.length;c++)a.events.push({color:"#FF00FF",title:b[c].title,start:b[c].startTime,end:b[c].endTime,editable:!0,allDay:!1})}),a.eventsF=function(a,b,c){var d=(new Date(a).getTime()/1e3,new Date(b).getTime()/1e3,new Date(a).getMonth(),[]);c(d)},a.calEventsExt=[],f={owner:4},b.one("Show/findme").get(f).then(function(b){for(var c=0;c<b.length;c++)a.calEventsExt.push({color:"#ff0000",title:b[c].title,start:b[c].startTime,end:b[c].endTime,editable:!1,allDay:!1})}),a.alertOnEventClick=function(b){a.alertMessage=b.title+" was clicked "},a.alertOnDrop=function(b,c){a.alertMessage="Event Droped to make dayDelta "+c},a.alertOnResize=function(b,c,d){a.alertMessage="Event Resized to make dayDelta "+d},a.addRemoveEventSource=function(a,b){var c=0;angular.forEach(a,function(d,e){a[e]===b&&(a.splice(e,1),c=1)}),0===c&&a.push(b)},a.addEvent=function(){a.events.push({title:"Open Sesame",start:new Date(e,d,28),end:new Date(e,d,29),className:["openSesame"],editable:!0})},a.remove=function(b){a.events.splice(b,1)},a.changeView=function(a,b){b.fullCalendar("changeView",a)},a.renderCalender=function(a){a&&a.fullCalendar("render")},a.uiConfig={calendar:{height:450,editable:!1,header:{left:"title",center:"",right:"today prev,next"},eventClick:a.alertOnEventClick,eventDrop:a.alertOnDrop,eventResize:a.alertOnResize}},a.eventSources=[a.calEventsExt,a.eventsF,a.events],a.eventSources2=[a.calEventsExt,a.eventsF,a.events]}]),angular.module("ui.calendar",[]).constant("uiCalendarConfig",{}).controller("uiCalendarCtrl",["$scope","$timeout",function(a,b){var c=1,d=1,e=a.eventSources,f=a.calendarWatchEvent?a.calendarWatchEvent:angular.noop,g=function(a){var c;return a&&(c=function(){var c=arguments;b(function(){a.apply(this,c)})}),c};this.eventsFingerprint=function(a){return a.__uiCalId||(a.__uiCalId=d++),""+a.__uiCalId+(a.id||"")+(a.title||"")+(a.url||"")+(+a.start||"")+(+a.end||"")+(a.allDay||"")+(a.className||"")+f(a)||""},this.sourcesFingerprint=function(a){return a.__id||(a.__id=c++)},this.allEvents=function(){for(var a=[],b=0,c=e.length;c>b;b++){var d=e[b];if(angular.isArray(d))a.push(d);else if(angular.isObject(d)&&angular.isArray(d.events)){var f={};for(var g in d)"_uiCalId"!==g&&"events"!==g&&(f[g]=d[g]);for(var h=0;h<d.events.length;h++)angular.extend(d.events[h],f);a.push(d.events)}}return Array.prototype.concat.apply([],a)},this.changeWatcher=function(a,b){var c,d=function(){for(var c,d,e=angular.isFunction(a)?a():a,g=[],h=0,i=e.length;i>h;h++)d=e[h],c=b(d),f[c]=d,g.push(c);return g},e=function(a,b){var c,d,e=[],f={};for(c=0,d=b.length;d>c;c++)f[b[c]]=!0;for(c=0,d=a.length;d>c;c++)f[a[c]]||e.push(a[c]);return e},f={},g=function(a,d){var g,h,i,j,k={},l=e(d,a);for(g=0,h=l.length;h>g;g++){var m=l[g];i=f[m],delete f[m];var n=b(i);n===m?c.onRemoved(i):(k[n]=m,c.onChanged(i))}var o=e(a,d);for(g=0,h=o.length;h>g;g++)j=o[g],i=f[j],k[j]||c.onAdded(i)};return c={subscribe:function(a,b){a.$watch(d,function(a,c){b&&b(a,c)===!1||g(a,c)},!0)},onAdded:angular.noop,onChanged:angular.noop,onRemoved:angular.noop}},this.getFullCalendarConfig=function(a,b){var c={};return angular.extend(c,b),angular.extend(c,a),angular.forEach(c,function(a,b){"function"==typeof a&&(c[b]=g(c[b]))}),c}}]).directive("uiCalendar",["uiCalendarConfig","$locale",function(a,b){var c=function(a){var b,c;b=[];for(c in a)b[c]=a[c];return b},d=b.DATETIME_FORMATS;return a=angular.extend({monthNames:c(d.MONTH),monthNamesShort:c(d.SHORTMONTH),dayNames:c(d.DAY),dayNamesShort:c(d.SHORTDAY)},a||{}),{restrict:"A",scope:{eventSources:"=ngModel",calendarWatchEvent:"&"},controller:"uiCalendarCtrl",link:function(b,c,d,e){function f(){var c,f=d.uiCalendar?b.$parent.$eval(d.uiCalendar):{};c=e.getFullCalendarConfig(f,a),k={eventSources:g},angular.extend(k,c);var h={};for(var i in k)"eventSources"!==i&&(h[i]=k[i]);return JSON.stringify(h)}var g=b.eventSources,h=!1,i=e.changeWatcher(g,e.sourcesFingerprint),j=e.changeWatcher(e.allEvents,e.eventsFingerprint),k=null;b.destroy=function(){b.calendar=d.calendar?b.$parent[d.calendar]=c.html(""):c.html("")},b.init=function(){b.calendar.fullCalendar(k)},i.onAdded=function(a){b.calendar.fullCalendar("addEventSource",a),h=!0},i.onRemoved=function(a){b.calendar.fullCalendar("removeEventSource",a),h=!0},j.onAdded=function(a){b.calendar.fullCalendar("renderEvent",a)},j.onRemoved=function(a){b.calendar.fullCalendar("removeEvents",function(b){return b===a})},j.onChanged=function(a){b.calendar.fullCalendar("updateEvent",a)},i.subscribe(b),j.subscribe(b,function(){return h===!0?(h=!1,!1):void 0}),b.$watch(f,function(){b.destroy(),b.init()})}}}]),angular.module("basilApp").controller("showController",["$scope","Restangular",function(a,b){a.showTitle="",a.startTime="",a.endTime="",a.ownerID="",a.success="FALSE",a.createShow=function(){var c={title:a.showTitle,owner:a.ownerID,startTime:a.startTime,endTime:a.endTime};b.all("Show").post(c).then(function(b){a.success="TRUE",console.log(b)})}}]),angular.module("basilApp").controller("recipeController",["$scope","Restangular",function(a,b){a.recipeText="",a.showID="",a.success="FALSE",a.createRecipe=function(){var c={text:a.recipeText,shows:a.showID};b.all("Recipe").post(c).then(function(b){a.success="TRUE",console.log(b)})}}]),angular.module("basilApp").controller("sessionController",["$scope","Restangular",function(a,b){a.success="FALSE",console.log("Controller loaded"),a.checkSession=function(){console.log("Checking session"),b.all("user").one("me").get().then(function(b){console.log(b),a.success="TRUE"})}}]),angular.module("basilApp").controller("categoryController",["$scope","facetService","$stateParams",function(a,b,c){void 0!==typeof c.select&&(a.category=c.select),b.getList().then(function(b){a.facetList=b}),b.getListGroupedByParentFacet().then(function(b){console.log(b),a.facetGroupedList=b,a.facetParents=b.null,a.occasions=b[1],a.diets=b[2],a.courses=b[3],a.tastes=b[4],a.techniques=b[5],a.cuisines=b[6],a.allergies=b[7]})}]),angular.module("basilApp").controller("profileController",["$scope","authService","gravatarService",function(a,b,c){a.banner="http://127.0.0.1:9000/static/images/banner.jpg",b.getSelf().then(function(b){a.self=b,c.getGravatar(name,500).then(function(b){a.avatar=b})},function(){})}]),angular.module("basilApp").service("facetService",["Restangular","$q",function(a,b){function c(){return g.getList()}function d(){var a=b.defer();return c().then(function(b){a.resolve(_.groupBy(b,function(a){return a.parentFacet}))}),a.promise}function e(a){return f[a]}var f,g=a.all("facet");return d().then(function(a){f=_.indexBy(a[null],"id")}),{getList:c,getListGroupedByParentFacet:d,getParentFacet:e}}]),angular.module("basilApp").service("gravatarService",["Restangular","$q",function(a,b){function c(c,e){var e=e||80,f=b.defer();return"undefined"!=typeof d.stored[c]&&f.resolve(d.stored[c]+"?s="+e),a.all("gravatar").one("get",c).get().then(function(a){d.stored[c]=a.image,f.resolve(d.stored[c]+"?s="+e)}),f.promise}var d={init:!0,stored:{}};return{getGravatar:c}}]),angular.module("basilApp").service("authService",["Restangular","$q",function(a,b){var c={name:null,self:null};return c.authenticate=function(c,d){var e=this,f=b.defer();return a.all("user/login").post({email:c,password:d}).then(function(a){"undefined"!=typeof a&&(e.name=a.name,f.resolve(a)),f.reject(a)},function(a){console.log(a),f.reject(a)}),f.promise},c.getName=function(){var c=this,d=b.defer();return a.one("user","me").get().then(function(a){"undefined"!=typeof a&&a.id&&(c.name=a.name,d.resolve(a.name)),d.reject("User is not logged in")}),d.promise},c.getSelf=function(){var c=this,d=b.defer();return a.one("user","me").get().then(function(a){"undefined"!=typeof a&&a.id&&(c.self=a,d.resolve(a)),d.reject("User is not logged in")}),d.promise},c.logout=function(){var c=this,d=b.defer();return a.one("user","logout").get().then(function(a){c.name=null,d.resolve(a)}),d.promise},c}]),angular.module("basilApp").service("notificationService",["Restangular","$q",function(a,b){function c(a,c){d.content=a,d.duration=c||1e4;var e=b.defer();return setTimeout(function(){d.content=null,e.resolve()},c),e.promise}var d={content:null};return{Notification:d,notify:c}}]),angular.module("basilApp").directive("videoPlayer",[function(){function a(a){var b=angular.copy(c);return b.clip.url=a,b}var b="/static/flash/flowplayer",c={clip:{url:"myurl",live:!0,provider:"influxis"},plugins:{influxis:{url:b+".rtmp-3.2.13.swf",netConnectionUrl:"rtmp://162.243.130.104:1935/videochat"},controls:{url:b+".controls-3.2.16.swf",bottom:0,volumeSliderColor:"#ffffff",volumeBorder:"1px solid rgba(128, 128, 128, 0.7)",volumeSliderGradient:"none",buttonColor:"#ffffff",sliderBorder:"1px solid rgba(128, 128, 128, 0.7)",disabledWidgetColor:"#555555",autoHide:"always",buttonOverColor:"#ffffff",backgroundGradient:"none",progressColor:"#f6df00",timeColor:"#ffffff",bufferColor:"#445566",callType:"default",sliderGradient:"none",buttonOffColor:"rgba(130,130,130,1)",progressGradient:"none",timeBgColor:"rgb(0, 0, 0, 0)",tooltipTextColor:"#ffffff",backgroundColor:"#DA7728",volumeColor:"#ffffff",timeBorder:"0px solid rgba(0, 0, 0, 0.3)",borderRadius:"0",tooltipColor:"#000000",durationColor:"#a3a3a3",bufferGradient:"none",sliderColor:"#DA7728",timeSeparator:" ",height:20,opacity:1,scrubber:!1,play:!0,volume:!0,mute:!0}},logo:{url:"/static/images/croissant-50.png",top:10,left:10,fullscreenOnly:!1,displayTime:0}};return{restrict:"C",scope:{name:"="},link:function(c,d){flowplayer(d[0],b+".commercial-3.2.18.swf",a(c.name))}}}]);