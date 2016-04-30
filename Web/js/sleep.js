var repeater = null;

function updateScoreForSeconds(seconds){
    document.getElementById("points").innerHTML = Math.floor(seconds / 60);
    var total = seconds;
    var hours = Math.floor(total / 1200);
    document.getElementById("hours").innerHTML = hours;
    total -= hours * 1200;
    var minutes = Math.floor(total / 60);
    document.getElementById("minutes").innerHTML = minutes;
    total -= minutes * 60;
    document.getElementById("seconds").innerHTML = total;
    localStorage.secondsSlept = seconds;
}
function dataSaved(){
    return typeof localStorage.secondsSlept !== undefined && !isNaN(localStorage.secondsSlept);
}
window.onload = function(){
  if(dataSaved()){
      updateScoreForSeconds(parseInt(localStorage.secondsSlept));
  }
  document.getElementById("toggle-button").onclick = function(){
      if(repeater == null){
          repeater = setInterval(function(){
              if(dataSaved()){
                  localStorage.secondsSlept = parseInt(localStorage.secondsSlept) + 1;
              }
              else{
                  localStorage.secondsSlept = 1;
              }
              updateScoreForSeconds(localStorage.secondsSlept);
          }, 1000);
          document.getElementById("toggle-button").innerHTML = "I just woke up";
      }
      else{
          clearInterval(repeater);
          repeater = null
          document.getElementById("toggle-button").innerHTML = "I'm going to sleep";
      }
  }
};