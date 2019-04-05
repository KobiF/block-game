//jshint maxerr:1, strict:false

let blockDivs = [];
let currentBlock = null;
let mouseActive = false;

function mouseDown(){
  mouseActive = true;
}
function mouseUp(){
  mouseActive = false;
}
function mouseMove(e){
  if(mouseActive)drawObj(e);
}

function setObject(num){
  if(currentBlock!==null)blockDivs[currentBlock].style.backgroundColor = "orange";
  blockDivs[num].style.backgroundColor = "slateblue";
  currentBlock = num;
}

function getCoords(e){
  coords = [Math.floor(e.offsetX/size),Math.floor(e.offsetY/size)];
  if(coords[0]>=cols)coords[0]=cols-1;
  if(coords[1]>=rows)coords[1]=rows-1;
  console.log(coords);
  return coords;
}

function drawObj(e){
  if(currentBlock!==null){
    coords = getCoords(e);
    ctx.fillStyle = allObjs[currentBlock].color;
    ctx.fillRect(coords[0]*size+0.5,coords[1]*size+0.5,size,size);
    ctx.stroke();
    setLevelCoord(coords,currentBlock);
  }
}


