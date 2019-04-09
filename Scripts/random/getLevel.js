//jshint maxerr:1, strict:false
let levels = [];
let level = null;
let completed = false;
let levelStorage = null;

function getLevel(){
  levels = [];
  randomLevel();
  console.log(levelStorage);
  return levelStorage;
}

getLevel();

function randomLevel(){
  let index = "levels";
  firebase.database().ref(index).once("value")
  .then(function(snapshot) {
    return snapshot.val();
  })
  .then(function(value) {
    index =  index + "/" + Object.keys(value)[Math.floor(Math.random()*Object.keys(value).length)];
    return firebase.database().ref(index).once("value");
  })
  .then(function(snapshot) {
    return snapshot.val();
  })
  .then(function(value){
    index =  index + "/" + Object.keys(value)[Math.floor(Math.random()*Object.keys(value).length)];
    return firebase.database().ref(index).once("value");
  })
  .then(function(snapshot) {
    index = snapshot.val();
    levelStorage = index;
    levels.push([index.levels[0],index.levels[1]]);
    document.getElementById("canvas").classList.remove("hidden");
    start();
  });
}
