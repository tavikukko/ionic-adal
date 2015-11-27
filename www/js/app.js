// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  /*  if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
*/

  });
})
.constant('adalConfig', {
  "authority" :"https://login.windows.net/tavikukko365.onmicrosoft.com",
  "redirectUri" : "http://ionic365videosnative",
  "resourceUri" : "https://tavikukko365.sharepoint.com",
  "clientId" : "b7f9b131-4d58-455f-a230-4c6fe381d200"
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'VideosCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})

.factory("appService", ["$http", "$q", "$window", "$ionicPlatform", "adalConfig", function ($http, $q, $window, $ionicPlatform, adalConfig) {

    var appService = {};

    appService.authenticte = function(CallBack) {
        var context = new $window.Microsoft.ADAL.AuthenticationContext(adalConfig.authority);
        context.tokenCache.readItems().then(function (items) {
           if (items.length > 0) {
                authority = items[0].authority;
                context = new $window.Microsoft.ADAL.AuthenticationContext(authority);
            }
            // Attempt to authorize user silently
            context.acquireTokenSilentAsync(adalConfig.resourceUri, adalConfig.clientId)
            .then(CallBack, function () {
                // We require user cridentials so triggers authentication dialog
                context.acquireTokenAsync(adalConfig.resourceUri, adalConfig.clientId, adalConfig.redirectUri)
                .then(CallBack, function (err) {
                    alert("Failed to authenticate: " + err);
                });
            });
        });
    };

    appService.getVideos = function(authResponse) {

      var deferred = $q.defer();
      var videos = { video: null };

      $http.get('https://tavikukko365.sharepoint.com/portals/hub/_api/VideoService/Search/Query?querytext=%27%27',
      { headers: {'Authorization': 'Bearer ' + authResponse.accessToken}})
        .then(function(result) {
            videos.video = result.data;
            deferred.resolve(videos);
        }, function(error) {
            alert(error.message);
      });
      return deferred.promise;
    };

    return appService;
}]);
;
