var repeater = null;

function updateScoreForSeconds(seconds){
    document.getElementById("points").innerHTML = Math.floor(seconds / 60).toLocaleString();
    var total = seconds;
    var hours = Math.floor(total / 3600);
    document.getElementById("hours").innerHTML = hours;
    total -= hours * 3600;
    var minutes = Math.floor(total / 60);
    document.getElementById("minutes").innerHTML = minutes;
    total -= minutes * 60;
    document.getElementById("seconds").innerHTML = total;
    localStorage.secondsSlept = seconds;
}
function dataSaved(){
    return typeof localStorage.secondsSlept !== undefined && !isNaN(localStorage.secondsSlept);
}
function updateStyleMode(style){
    var toggleButton = document.getElementById("toggle-button");
    var html = document.getElementsByTagName("html")[0];
    if(style === "night"){
        if(!toggleButton.classList.contains("night")){
              toggleButton.classList.add("night");
              toggleButton.classList.remove("day");
              html.classList.add("night");
              html.classList.remove("day");
          }
    }
    else if(style === "day"){
        toggleButton.classList.add("day");
        toggleButton.classList.remove("night");
        html.classList.add("day");
        html.classList.remove("night");
    }
}
window.onload = function(){
  if(dataSaved()){
      updateScoreForSeconds(parseInt(localStorage.secondsSlept));
  }
  document.getElementById("toggle-button").onclick = function(){
      if(repeater === null){
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
          updateStyleMode("night");
      }
      else{
          clearInterval(repeater);
          repeater = null
          document.getElementById("toggle-button").innerHTML = "I'm going to sleep";
          updateStyleMode("day");
      }
  }
};