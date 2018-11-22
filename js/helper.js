function setBackgroundVid(){
    window.setTimeout(function(){
      for (var jj=0;jj<document.querySelectorAll(".vidWrapper").length;jj++){
          var elm=document.querySelectorAll(".vidWrapper")[jj];
          let dWRatio=elm.offsetWidth/elm.querySelector(".vid").offsetWidth;
          elm.querySelector(".vid").style.transform="scaleX("+dWRatio+")";
          elm.querySelector(".vid").addEventListener("ended",function(e){
              e.target.play();
          });
          elm.querySelector(".vid").addEventListener("canplay",function(e){
            e.target.play();
        });
    }
    },100);
}
var player=null;
function createPlayer(){
  if (player==null){
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
}
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '266',
    width: '411',
    videoId: 'VlJ_iKLzjAI',
    playerVars:{
      controls:2,
      autohide:1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}
          

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
//        event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
//          setTimeout(stopVideo, 6000);
    done = true;
  }
  else{
//          setTimeout(stopVideo, 1000);
  }
}
function showPlayer(){
  $("#player").removeClass("hideMe");
  $("#curtain").removeClass("hideMe");
  $("#player").css("left",$(window).width()/2-$("#player").width()/2).css("top",$(window).height()/2-$("#player").height()/2);
  $("#eFirstStripeInAboutPgWrapperWrapper>.stripeContent>.visual>.playVideoButton").removeClass("standout");
  window.setTimeout("playVideo()",1000);
}
function hidePlayer(){
      $("#player").addClass("hideMe");
      $("#curtain").addClass("hideMe");
      $("#eFirstStripeInAboutPgWrapperWrapper>.stripeContent>.visual>.playVideoButton").addClass("standout");
      try{
          player.pauseVideo();
      }
      catch(err){
      /* hack to solve bug in youtube api on ie11 on 32-bit, still hanging around in jan 2015*/
          $("#player").remove();
          $("<div/>").prop("id","player").appendTo("body");
          onYouTubeIframeAPIReady();
      }
}
function playVideo(){
      try{
          player.playVideo();
      }
      catch(err){
      }
}
