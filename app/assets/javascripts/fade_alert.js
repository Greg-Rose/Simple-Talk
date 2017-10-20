var fadeAlert = function() {
  $(".main-alerts").fadeTo(3000, 1000).slideUp(1000, function(){
    $(".main-alerts").slideUp(1000);
  });
};
