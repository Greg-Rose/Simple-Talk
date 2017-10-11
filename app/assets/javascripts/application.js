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
  var audio_context;
  var recorder;
  function startUserMedia(stream) {
    var input = audio_context.createMediaStreamSource(stream);
    // Uncomment if you want the audio to feedback directly
    //input.connect(audio_context.destination);

    recorder = new Recorder(input);
  }

  function startRecording(button) {
    recorder.record();
  }

  function stopRecording(button) {
    recorder.stop();

    saveRecording();
    recorder.clear();
  }

  function saveRecording() {
    recorder.exportWAV(function(blob) {
      var url = URL.createObjectURL(blob);
      var formData = new FormData();
      formData.append('recording', blob);
      var request = $.ajax({
          type: "POST",
          url: "api/v1/translations",
          beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));},
          processData: false,
          contentType: false,
          data: formData
      });

      request.success(function(response) {
        $(".red-dot").addClass("red-dot-with-edit-btn");
        $(".edit-btn-div").show();
        $('.welcome-screen .jargon h3').html(response.original);
        $('.welcome-screen .laymans h3').html(response.simplified);
        $('.translation-box').slideDown(400);
        $('#loader').slideUp(400).remove();
        $('.mic-btn img, .red-dot').unbind('click', false);
      });
    });
  }

  try {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;

    audio_context = new AudioContext();
  } catch (e) {
    alert('No web audio support in this browser!');
  }

  navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
    // __log('No live audio input: ' + e);
  });

  $("body").on("click", ".mic-btn img, .red-dot", function(event) {
    $('.mic-btn img, .red-dot').bind('click', false);
    $(".recording-dot").show();
    $(".translation-box").slideUp(400);
    $(".edit-btn-div").hide();
    $(".red-dot").removeClass("red-dot-with-edit-btn");
    showLoader();
    startRecording();
    $(".recording-dot, .red-dot").addClass("recording-dot-with-stop-btn");
    $(".stop-btn-div").show();
    $("#stop-btn").off().click(function(event2) {
      event2.preventDefault();
      event2.stopPropagation();
      $(".stop-btn-div").hide();
      $(".recording-dot, .red-dot").removeClass("recording-dot-with-stop-btn");
      $(".recording-dot").hide();
      stopRecording();
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
