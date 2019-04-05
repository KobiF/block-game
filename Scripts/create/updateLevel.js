//jshint maxerr:1, strict:false

const output = document.getElementById("levelCodeOutput");
const errBox = document.getElementById("err");


function setLevelCoord(coords,num){
  level[coords[1]][coords[0]] = num;
}

function getCode(){
  let string = "";
  for(i=0;i<level.length;i++){
    console.log(level[i].join(','));
    string += level[i].join(',') + ";";
  }
  string+=size;
  console.log(string);
  output.value = string;
}

function displayLevel(){
  code = document.getElementById("levelCodeInput").value;
  let levelIn = code.split(';');
  let size = levelIn.pop();
  levelIn[0] = levelIn[0].split(",");
  for(i=1;i<levelIn.length;i++){
    levelIn[i] = levelIn[i].split(",");
    if(levelIn[i].length!==levelIn[0].length){
      errBox.innerHTML = "There was an error with the level where the dimensions were not rectangular, please make sure the link was copied correnctly.";
      return false;
    }
  }
  for(i=0;i<levelIn.length;i++){
    for(j=0;j<levelIn[0].length;j++){
      levelIn[i][j] = parseInt(levelIn[i][j],10);
      //Make sure all values are numbers
      if(!Number.isInteger(levelIn[i][j])){
        console.log(i + " " + j + " " + levelIn[i][j]);
        errBox.innerHTML = "There was an error with the level where a value where a cell's value was not equal to an integer, please make sure the link was copied correnctly.";
        return false;
      }
      //Make sure all intergers are valid integers
      if(0>levelIn[i][j]||levelIn[i][j]>allObjs.length){
        console.log(i + " " + j + " " + levelIn[i][j]);
        errBox.innerHTML = "There was an error with the level where a value specified does not have a tile associated with it, please make sure that all numbers are integers from 0 to "+ (allObjs.length-1) + ".";
        return false;
      }
    }
  }
  console.log("valid");
  sizeDiv.value = size;
  colsDiv.value = levelIn[0].length;
  rowsDiv.value = levelIn.length;
  applySettings();
  console.log(levelIn);
  for(i=0;i<levelIn.length;i++){
    for(j=0;j<levelIn[0].length;j++){
      setLevelCoord([j,i],levelIn[i][j]);
      ctx.fillStyle = allObjs[levelIn[i][j]].color;
      ctx.fillRect(j*size+0.5,i*size+0.5,size,size);
      ctx.stroke();
    }
  }
}
