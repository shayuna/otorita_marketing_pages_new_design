function setVidWidth(){
    window.setTimeout(function(){
        let dWRatio=document.querySelector(".vidWrapper").offsetWidth/document.querySelector(".vid").offsetWidth;
        document.querySelector(".vid").style.transform="scaleX("+dWRatio+")";
    },100);
}
