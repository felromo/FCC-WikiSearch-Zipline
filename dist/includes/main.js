// re-write this as angular
$(document).ready(function () {
  $(".search-initial").on("click", function () {
    $('input').addClass('search-bar-after');
    $('.starter-tip#first-tip').addClass('no-show');
    $(this).addClass('search-after');
  });
});

angular.module('wikiApp', [])

.factory('wikiFactory', ['$http', function ($http) {
  var url = "https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json";
  var callback = "&callback=JSON_CALLBACK;"
  return {
    test: function () {
      // returns the promise for further processing
      return $http.jsonp(url+callback);
    },
  };
}])

.controller('wikiController', ['wikiFactory', function (wikiFactory) {

  wikiFactory.test().then(function (reply) {
    console.log(reply);
  });

  console.log("test");

}]);
