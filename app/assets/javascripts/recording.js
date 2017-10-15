var recorder;

function startUserMedia(stream) {
  recorder = new Recorder();
  recorder.initStream();

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
  recorder.start();

  recorder.addEventListener( "dataAvailable", function(e){
    var dataBlob = new Blob( [e.detail], { type: 'audio/ogg' } );
    saveRecording(dataBlob);
  });
}

function stopRecording(button) {
  recorder.stop();
  recorder = new Recorder();
  recorder.initStream();
}

function saveRecording(blob) {
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
}

function InitializeRecording() {
  if (navigator.mediaDevices || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
    startUserMedia();
  } else {
    message = "Your browser is not compatible. Please try updating your browser to the most recent version.";
    $("#browser-alert").text(message).show();
  }
}
