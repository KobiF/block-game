//jshint maxerr:1, strict:false

const canvasSec = document.getElementById("canvasSec");
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const rowsDiv = document.getElementById("rows");
const colsDiv = document.getElementById("cols");
const sizeDiv = document.getElementById("size");
let rows = rowsDiv.value;
let cols = colsDiv.value;
let size = sizeDiv.value;
let level = [];

function applySettings(){
  rows = rowsDiv.value;
  cols = colsDiv.value;
  size = sizeDiv.value;
  level = [];
  ctx.rect(0,0,canvas.width,canvas.height);
  canvas.width = cols*size;
  canvas.height = rows*size;
  ctx.strokeStyle = "black";
  for(i=0;i<rows;i++){
    row = [];
    for(j=0;j<cols;j++){
      ctx.rect(j*size+0.5, i*size+0.5,size,size);
      row.push(0);
    }
    level.push(row);
  }
  ctx.stroke();
}

function setUpBlocks(){
  let blocksDiv = document.getElementById("blocks");
  blocksDiv.setAttribute("style","grid-template-columns:repeat(" + allObjs.length + ",1fr)");
  for(i=0;i<allObjs.length;i++){
    blockDiv = document.createElement("div");
    blockDiv.classList.add("blockdiv");
    blockDiv.setAttribute("onClick","setObject(" + i + ")");
    p = document.createElement("p");
    if(allObjs[i].type==="obsticle"){
      p.innerHTML = allObjs[i].name;
    }else{
      p.innerHTML = allObjs[i].type;
    }
    blockDiv.appendChild(p);
    color = document.createElement("div");
    color.classList.add("color");
    color.style.backgroundColor = allObjs[i].color;
    blockDiv.appendChild(color);
    blocksDiv.appendChild(blockDiv);
    blockDivs.push(blockDiv);
  }
}

function init(){
  applySettings();
  setUpBlocks();
}
init();