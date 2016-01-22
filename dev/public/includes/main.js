// re-write this as angular
$(document).ready(function () {
  $(".search-initial").on("click", function () {
    $('input#search').addClass('search-bar-after');
    $('.starter-tip#first-tip').addClass('no-show');
    $(this).addClass('search-after');
  });
});

angular.module('wikiApp', ['ngSanitize'])

.factory('wikiFactory', ['$http', function ($http) {
  var search_term = "&srsearch=freedom";
  var search_limit = "&srlimit=5";

  var base_url = "https://en.wikipedia.org/w/api.php?";
  var search_list = "action=query&list=search&format=json&srprop=snippet";
  var callback = "&callback=JSON_CALLBACK";
  return {
    setSearchTerm: function (term) {
      search_term = "&srsearch=" + term;
    },
    setSearchLimit: function (limit) {
      search_limit = "&srlimit=" + limit;
    },
    getList: function () {
      return $http.jsonp(base_url + search_list + search_term + search_limit + callback);
    }
  };
}])

.controller('wikiController', ['wikiFactory', function (wikiFactory) {

  var self = this;
  self.list_of_articles = [];
  self.term = "Open Source";
  self.display_articles = false;

  // wrapper function so we won't have anything hanging in the open
  self.init = function () {

  };

  self.removeLanding = function () {
    $('h1.title').addClass('remove');
    $('form#search-form').addClass('remove');
    $('.random-article').addClass('remove');
  };

  self.runSearch = function () {
    wikiFactory.setSearchTerm(self.term);
    wikiFactory.getList().then(function (reply) {
      console.log(reply);
    self.list_of_articles = reply.data.query.search;
    console.log(self.list_of_articles);
    self.display_articles = true;
    self.removeLanding();
    }, function () {
      console.log("error retrieving the list of articles");
    });
  };

  // run the wrapper function
  self.init();

}]);
