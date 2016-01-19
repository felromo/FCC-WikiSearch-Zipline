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
  var search_title = "";

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
    setTitle: function (title) {
      search_title = title;
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

  var self = this;
  self.list_of_articles = [];
  self.term = "Open Source";

  // wrapper function so we won't have anything hanging in the open
  self.init = function () {
    self.runSearch();

  };

  self.runSearch = function () {
    wikiFactory.setSearchTerm(self.term);
    wikiFactory.getList().then(function (reply) {
    self.list_of_articles = reply.data.query.search;
    console.log(self.list_of_articles);
    }, function () {
      console.log("error retrieving the list of articles");
    });
  };

  // run the wrapper function
  self.init();

}]);
