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
/*
    var authority = "https://login.windows.net/tavikukko365.onmicrosoft.com",
    redirectUri = "http://ionic365videosnative",
    resourceUri = "https://tavikukko365.sharepoint.com",
    clientId = "b7f9b131-4d58-455f-a230-4c6fe381d200",
    graphApiVersion = "2013-11-08";

  if (typeof Microsoft != 'undefined') {
    var AuthenticationContext = Microsoft.ADAL.AuthenticationContext;

    AuthenticationContext.createAsync(authority)
    .then(function (authContext) {
      authContext.acquireTokenAsync(resourceUri, clientId, redirectUri)
      .then(function (authResponse) {
          alert("Token acquired: " + authResponse.accessToken);
          alert("Token will expire on: " + authResponse.expiresOn);
      }, function (err) {
        alert("Failed to authenticate: " + err);
      });
    }, function (err) {
     alert("Failed to authenticate: " + err);
    });
  }else{ alert('ei loydy');}
*/
  });
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

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
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
  $urlRouterProvider.otherwise('/app/playlists');
});
