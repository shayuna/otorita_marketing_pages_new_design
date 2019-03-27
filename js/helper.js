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

function setVideoElm(eVid,sVidRelativeAddress){
  var req = new XMLHttpRequest();
  req.open('GET', sVidRelativeAddress, true);
  req.responseType = 'blob';
  
  req.onload = function() {
     // Onload is triggered even on 404
     // so we need to check the status code
     if (this.status === 200) {
        var videoBlob = this.response;
        var vid = URL.createObjectURL(videoBlob); // IE10+
        // Video is now downloaded
        // and we can set it as source on the video element
        eVid.src = vid;
     }
  }
  req.onerror = function() {
    console.log ("there was an error in setVideoFile.");
  }
  req.send();
}
function isMobile(){
  return document.getElementById("eDetectMobile") && getComputedStyle(document.getElementById("eDetectMobile")).getPropertyValue("display")==="none";
}

elementsCarousell = function(sElementWrapperId,sElementClass,iCurrent){
  this.sElementWrapperId=sElementWrapperId;
  this.sElementClass=sElementClass;
  this.iCurrent=iCurrent;
  var hInterval=null;
  this.showElement = function(iCurrent){
    /* doing the same old thing in a different way. just don't get bored.*/

    document.querySelectorAll("#"+this.sElementWrapperId+" ."+this.sElementClass).forEach(function(elm,ii){
      elm.classList.add("hideMe");
    });
    $("#"+this.sElementWrapperId).find("."+this.sElementClass).eq(iCurrent).removeClass("hideMe");
  };
  this.showNext = function(){
    resetInterval();
    this.iCurrent = this.iCurrent===$("#"+this.sElementWrapperId).find("."+this.sElementClass).length-1 ? 0 : this.iCurrent+1;
    this.showElement(this.iCurrent);
  };
  this.showPrevious = function(){
    resetInterval();
    this.iCurrent = this.iCurrent===0 ? $("#"+this.sElementWrapperId).find("."+this.sElementClass).length-1 : this.iCurrent-1;
    this.showElement(this.iCurrent);
  };
  var resetInterval = function(){
      clearInterval(hInterval);
      hInterval=setInterval(showElementAndAdvance,3000);
    };
  var showElementAndAdvance = function(){
    return;/* only in debug */
    this.iCurrent = this.iCurrent===$("#"+this.sElementWrapperId).find("."+this.sElementClass).length-1 ? 0 : this.iCurrent+1;
    this.showElement(this.iCurrent);
  };
  showElementAndAdvance=showElementAndAdvance.bind(this);
  resetInterval();
}

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
            oElementsCarousell.showPrevious()
          } else {
            oElementsCarousell.showNext()
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
        } else { 
            /* down swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};
function setMainMenuOnMobileState(bState){
  const liMenuClassList=document.getElementById("eMainMenuOnMobile").classList;
  if (!!bState){
    liMenuClassList.add("showMobileMenu","maxHeight");
    liMenuClassList.remove("hideMobileMenu", "minHeight");
    $("#eMainNavInFtr>.section").addClass("resetZIndex");/* a hack in order to prevent this section to override the mobile menu*/
  }
  else{
    liMenuClassList.add("hideMobileMenu","minHeight" );
    liMenuClassList.remove("showMobileMenu","maxHeight");
    $("#eMainNavInFtr>.section").removeClass("resetZIndex");/* a hack in order to prevent this section to override the mobile menu*/
  }
}