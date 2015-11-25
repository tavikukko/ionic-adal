angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $window) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $http, $window, $ionicPlatform) {
  $scope.playlists = [];

  var authority = "https://login.windows.net/tavikukko365.onmicrosoft.com",
  redirectUri = "http://ionic365videosnative",
  resourceUri = "https://tavikukko365.sharepoint.com",
  clientId = "b7f9b131-4d58-455f-a230-4c6fe381d200",
  graphApiVersion = "2013-11-08";

  function getVideos(authResponse){
    $http.get('https://tavikukko365.sharepoint.com/portals/hub/_api/VideoService/Search/Query?querytext=%27%27',
    { headers: {'Authorization': 'Bearer ' + authResponse.accessToken}})
      .then(function(result) {
          result.data.value.forEach(function(val, i) {
              $scope.playlists.push({ title: val.Title, id: i });
          });
      }, function(error) {
          alert("controlissa: " + error.message);
      });
  }

  $ionicPlatform.ready(function() {

    var context = new $window.Microsoft.ADAL.AuthenticationContext(authority);
    context.tokenCache.readItems().then(function (items) {
        if (items.length > 0) {
            authority = items[0].authority;
            context = new $window.Microsoft.ADAL.AuthenticationContext(authority);
        }
        // Attempt to authorize user silently
        context.acquireTokenSilentAsync(resourceUri, clientId)
        .then(getVideos, function () {
            // We require user cridentials so triggers authentication dialog
            context.acquireTokenAsync(resourceUri, clientId, redirectUri)
            .then(getVideos, function (err) {
                app.error("Failed to authenticate: " + err);
            });
        });
    });
  });
})

.controller('PlaylistCtrl', function($scope, $stateParams, $window) {

});
