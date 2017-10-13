var audio_context;
var recorder;

function startUserMedia(stream) {
  var input = audio_context.createMediaStreamSource(stream);
  // Uncomment if you want the audio to feedback directly
  //input.connect(audio_context.destination);

  recorder = new Recorder(input);

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

function InitializeRecording() {
  if (navigator.mediaDevices) {
    try {
      // webkit shim
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      window.URL = window.URL || window.webkitURL;

      audio_context = new AudioContext();
    } catch (e) {
      alert('No web audio support in this browser!');
    }

    navigator.mediaDevices.getUserMedia({audio: true})
    .then(startUserMedia)
    .catch(function(err) {
      message = "We can't access your microphone. Please try accepting the permissions request for micriphone access.";
      $("#browser-alert").text(message).show();
    });
  } else {
    message = "Your browser is not compatible. Please try updating your browser to the most recent version.";
    $("#browser-alert").text(message).show();
  }
}
