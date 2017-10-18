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
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require_tree .

$(document).ready(function() {
  currentPath = window.location.pathname;
  if (currentPath == "/" || currentPath.includes("/welcome/index")) {
    InitializeRecording();

    $(".mic-btn img, .red-dot").hover(
      function() {
        $(".red-dot").show();
      }, function() {
        $(".red-dot").hide();
    });

    $("body").on("click", "#edit-btn", function(event) {
      event.preventDefault();
      event.stopPropagation();
      var laymansOriginal = $('.laymans .translation').text();
      $('.laymans').slideUp(400);
      $('.laymans-edit textarea').val(laymansOriginal);
      $('.edit-box').slideDown(400);
      $('#edit-btn').removeClass('btn-primary').addClass('btn-success').text("Submit").attr("id","submit-btn");
    });

    $("body").on("click", "#submit-btn", function(event) {
      event.preventDefault();
      event.stopPropagation();
      var laymansEdit = $('.laymans-edit textarea').val();
      $('.edit-box').slideUp(400);
      $('.laymans .translation').text(laymansEdit);
      $('.laymans').slideDown(400);
      $('#submit-btn').removeClass('btn-success').addClass('btn-primary').text("Edit").attr("id","edit-btn");
    });
  }
});
