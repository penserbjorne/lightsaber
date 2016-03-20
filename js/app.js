'use strict';
var encendido,tituloRemovido,mostrandoBanners,vibrar; //Bool
var sonido,intro; //Audio
var intervalCount,colorSable; //Entero
var acceGraX,acceGraY; //Decimal

function OnOff(evt){
  if(!tituloRemovido){
    var parent = document.getElementById("titles");
    var child = document.getElementById("titlecontent");
    parent.removeChild(child);
    intro.pause();
    tituloRemovido = true;
  }
  if(encendido){
    sonido.pause();
    sonido.src = "sounds/powerOff.wav";
    sonido.addEventListener("ended", function() {
      sonido.pause();
      sonido.src = "";
    }, true);
    sonido.loop = false;
    sonido.play();
  }else{
    sonido.pause();
    sonido.src = "sounds/powerOn.wav";
    sonido.addEventListener("ended", function() {
      sonido.pause();
      sonido.src = "sounds/standBy.wav";
      sonido.loop = true;
      sonido.play();
    }, true);
    sonido.loop = false;
    sonido.play();
  }
  encendido = !encendido;
}


function handleMotion(evt) {
  intervalCount++;
  if(intervalCount > 15){

    var deltaX = acceGraX - evt.accelerationIncludingGravity.x;
    var deltaY = acceGraY - evt.accelerationIncludingGravity.y;
    var woms = new Audio();
    var hits = new Audio();
    var wom = false;
    var hit = false;

    deltaX = Math.abs(deltaX);
    deltaY = Math.abs(deltaY);

    if(deltaX >= 17){
      woms.src = "sounds/swing03.wav";
      wom = true;
    }else if(deltaX >= 12){
      woms.src = "sounds/swing02.wav";
      wom = true;
    }else if(deltaX >= 7){
      woms.src = "sounds/swing01.wav";
      wom = true;
    }

    if(deltaY >= 22){
      hits.src = "sounds/hit03.wav";
      hit = true;
    }else if(deltaY >= 27){
      hits.src = "sounds/hit02.wav";
      hit = true;
    }else if(deltaY >= 12){
      hits.src = "sounds/hit01.wav";
      hit = true;
    }

    if(encendido && wom){
      woms.play();
    }
    if(encendido && hit){
      hits.play();
      if(vibrar){
        window.navigator.vibrate([100, 100, 100]);
      }
    }

    acceGraX = evt.accelerationIncludingGravity.x;
    acceGraY = evt.accelerationIncludingGravity.y;

    intervalcount = 0;
  }
}

function changeColor(evt){
  //colorSable   Val
  //Verde        0
  //Azul         1
  //Rojo         2
  //Morado       3
  colorSable++;
  if(colorSable > 3){
    colorSable = 0;
  }
  switch(colorSable){
    case 0:
      document.getElementById("sablecolor").className = "plasma yoda";
      break;
    case 1:
      document.getElementById("sablecolor").className = "plasma obi-wan";
      break;
    case 2:
      document.getElementById("sablecolor").className = "plasma vader";
      break;
    case 3:
      document.getElementById("sablecolor").className = "plasma windu";
      break;
  }
}

function showAds(){
    /*CreateBannerAtTop('adBannerTop',21);*/
    CreateBannerAtBottom('adBannerBottom',30);
    RefreshInterstitial();
}

function OnOffVibrate(){
  if(vibrar){
    document.getElementById("vibrar2").src = "img/vibrateno.png";
  }else{
    document.getElementById("vibrar2").src = "img/vibrate.png";
    window.navigator.vibrate(100);
  }
  vibrar = !vibrar;
}

window.onload = function() {
  intro = new Audio();
  intro.src = "sounds/starwars.wav";
  intro.play();
  
  intervalCount = 0;
  colorSable = 0;
  encendido = false;
  tituloRemovido = false;
  vibrar = true;
  
  sonido = new Audio();
  document.getElementById("vibrar").addEventListener("click", OnOffVibrate, false);
  document.getElementById("sablecolor").addEventListener("click", changeColor, false);
  document.getElementById("sablecolor2").addEventListener("click", changeColor, false);
  document.getElementById("sable").addEventListener("click", OnOff, false);
  window.addEventListener("devicemotion", handleMotion, true);
  window.setInterval(function () { showAds(); }, 180000);
  
  InitTappxInterstitial('/120940746/Pub-4965-Firefox-5547','adInterstitial');
  InitTappxBanner('/120940746/Pub-4965-Firefox-5547',['adBannerTop','adBannerBottom']);
  CreateInterstitial();
};