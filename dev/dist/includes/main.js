$(document).ready(function () {
  $(".search-initial").on("click", function () {
    $('input').addClass('search-bar-after');
    $('.starter-tip#first-tip').addClass('no-show');
    $(this).addClass('search-after');
  });
});
