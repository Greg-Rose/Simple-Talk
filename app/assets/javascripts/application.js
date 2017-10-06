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
  var audio_context;
  var recorder;
  function startUserMedia(stream) {
    var input = audio_context.createMediaStreamSource(stream);
    // __log('Media stream created.');
    // Uncomment if you want the audio to feedback directly
    //input.connect(audio_context.destination);
    //__log('Input connected to audio context destination.');

    recorder = new Recorder(input);
    // alert('Recorder initialized.');
  }

  try {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;

    audio_context = new AudioContext;
    // __log('Audio context set up.');
    // alert('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
  } catch (e) {
    alert('No web audio support in this browser!');
  }

  navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
    // __log('No live audio input: ' + e);
  });

  $("body").on("click", ".mic-btn img, .red-dot", function(event) {
    $(".recording-dot").show();
    $(".translation-box").slideUp(400);
    $(".edit-btn-div").hide();
    $(".red-dot").removeClass("red-dot-with-edit-btn");
    showLoader();
    $.get( "/api/v1/simple_translation", function( data ) {
      $(".translation").remove();
      $(".recording-dot").hide();
      $(".red-dot").addClass("red-dot-with-edit-btn");
      $(".edit-btn-div").show();
      $('.welcome-screen .jargon').append(data.original);
      $('.welcome-screen .laymans').append(data.simple);
      $('.translation-box').hide().slideDown(400);
      $('#loader').slideUp(400).remove();
    });
  });

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
});
