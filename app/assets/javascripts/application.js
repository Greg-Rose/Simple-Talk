// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require jquery
//= require bootstrap-sprockets
//= require_tree .

$(document).ready(function() {
  $(".welcome-screen").on("click", "#simple-talk-btn", function(event) {
    $(".welcome-screen").slideUp(800);

    $.get( "/simple_translation/new", function( data ) {
      $('body').append(data);
      $(".new-translation").hide().slideDown(800);
    });
  });

  $("body").on("click", "#listen-btn", function(event) {
    event.preventDefault();
    $.get( "/simple_translation", function( data ) {
      $('body').append(data);
    });
  });
});
