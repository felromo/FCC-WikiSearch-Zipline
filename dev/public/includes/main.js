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
  var search_term = "&srsearch=freedom";

  var base_url = "https://en.wikipedia.org/w/api.php?";
  var url = "action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json";
  var search_list = "action=query&list=search&format=json&titles=Independence";
  var search_titles = "action=query&prop=extracts|images|pageimages&format=json&titles=Independence";
  var callback = "&callback=JSON_CALLBACK";
  return {
    test: function () {
      // returns the promise for further processing
      return $http.jsonp(base_url+url+callback);
    },
    setSearchTerm: function (term) {
      search_term = "&srsearch=" + term;
    },
    getList: function () {
      return $http.jsonp(base_url+search_list+search_term+callback);
    },
    titles: function () {
      return $http.jsonp(base_url+search_titles+callback);
    }
  };
}])

.controller('wikiController', ['wikiFactory', function (wikiFactory) {

  wikiFactory.test().then(function (reply) {
    console.log(reply);
  });
  wikiFactory.getList().then(function (reply) {
    console.log(reply);
  });
  wikiFactory.titles().then(function (reply) {
    console.log(reply);
  });

  console.log("test");

}]);
