//jshint maxerr:1, strict:false
let levels = [];
let level = [];
let completed = false;
const errBox = document.getElementById("errbox");

const debug = "2,2,2,2,2,2,2,2,2,2,2,2,2,2,2;2,0,0,0,0,0,0,0,0,0,0,0,0,0,2;2,0,1,0,0,0,0,0,0,0,0,0,0,4,2;2,0,0,0,0,0,0,0,0,0,0,0,0,0,2;2,2,2,2,0,0,0,0,0,0,0,0,0,0,2;2,0,0,0,0,0,0,0,0,0,0,2,2,2,2;2,0,0,0,0,0,0,0,0,0,0,0,0,0,2;2,0,0,0,0,0,2,2,2,0,0,0,0,0,2;2,0,0,0,0,0,0,0,0,0,0,0,0,0,2;2,3,3,3,3,3,3,3,3,3,3,3,3,3,2;40";

function validate(){
  level = [];
  errBox.innerHTML = "";
  string = document.getElementById("levelInput").value;
  // if(debug!==null)string = debug;
  level = string.split(";");
  size = level.pop();
  console.log(size);
  for(i=0;i<level.length;i++)level[i] = level[i].split(",");
  console.log(level);
  
  // Check if array is rectangular
  for(i=0;i<level.length;i++){
    if(level[i].length!==level[0].length){
      errBox.innerHTML = "There was an error with the level where the dimensions were not rectangular, please make sure the link was copied correnctly.";
      return false;
    }
  }
  playerExists = false;
  doorExists = false;
  for(i=0;i<level.length;i++){
    for(j=0;j<level[0].length;j++){
      level[i][j] = parseInt(level[i][j],10);
      //Make sure all values are numbers
      if(!Number.isInteger(level[i][j])){
        console.log(i + " " + j + " " + level[i][j]);
        errBox.innerHTML = "There was an error with the level where a value where a cell's value was not equal to an integer, please make sure the link was copied correnctly.";
        return false;
      }
      //Make sure all intergers are valid integers
      if(0>level[i][j]||level[i][j]>allObjs.length){
        console.log(i + " " + j + " " + level[i][j]);
        errBox.innerHTML = "There was an error with the level where a value specified does not have a tile associated with it, please make sure that all numbers are integers from 0 to "+ (allObjs.length-1) + ".";
        return false;
      }
      //make sure border is solid to not allow player to fall out
      if((i===0||j===0||i===level.length-1||j===level[0].length-1)&&level[i][j]!==2&&level[i][j]!==3){
        console.log(i + " " + j + " " + level[i][j]);
        errBox.innerHTML = "Your level was not surrounded by either Walls or Lava, making it possible for the player to fall out of the level. This can cause errors so please avoid this.";
        return false;
      }
      //make sure player always has only 1 place to start
      if(level[i][j]===1){
        if(playerExists){
          console.log(i + " " + j + " " + level[i][j]);
          errBox.innerHTML = "Your level has more than one place where the player is supposed to start, denoted by a dark green tile. The player can only start in one location, and if more than one location is specified the result may not be as intended.";
          return false;
        }else{
          playerExists = true;
        }
      }
      //make sure there is at least 1 door
      if(level[i][j]===4)doorExists = true;
    }
  }
  if(!playerExists){
    errBox.innerHTML = "Your level did not contain a starting point for the player, a dark green tile, please add this.";
    return false;
  }
  if(!doorExists){
    errBox.innerHTML = "Your level did not contain an exit door for the player, a brown tile, please add this.";
    return false;
  }
  console.log("valid");
  completed = false;
  levels = [];
  levels.push([level,size]);
  document.getElementById("canvas").classList.remove("hidden")
  start();
}

function submit(){
  
}