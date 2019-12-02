var grid = document.getElementById("grid");
var testMode = false; //Turn this variable to true to see where the traps are
generateGrid();

function generateGrid() {
  //generate 20 by 20 grid
  grid.innerHTML="";
  for (var i=0; i<20; i++) {
    row = grid.insertRow(i);
    for (var j=0; j<20; j++) {
      cell = row.insertCell(j);
      cell.onclick = function() { clickCell(this); };
      var trap = document.createAttribute("data-trap");       
      trap.value = "false";             
      cell.setAttributeNode(trap);
    }
  }
  addTraps();
}

function addTraps() {
  //Add traps randomly
  for (var i=0; i<40; i++) {
    var row = Math.floor(Math.random() * 20);
    var col = Math.floor(Math.random() * 20);
    var cell = grid.rows[row].cells[col];
    cell.setAttribute("data-trap","true");
    if (testMode) cell.innerHTML="T";
  }
}

function revealTraps() {
    //Highlight all traps in blue
    for (var i=0; i<20; i++) {
      for(var j=0; j<20; j++) {
        var cell = grid.rows[i].cells[j];
        if (cell.getAttribute("data-trap")=="true") cell.className="trap";
      }
    }
}

function checkLevelCompletion() {
  var levelComplete = true;
    for (var i=0; i<20; i++) {
      for(var j=0; j<20; j++) {
        if ((grid.rows[i].cells[j].getAttribute("data-trap")=="false") && (grid.rows[i].cells[j].innerHTML=="")) levelComplete=false;
      }
  }
  if (levelComplete) {
    alert("You Win! <br> Congradulations");
    revealTraps();
  }
}/*
function startTime(){
 var k= document.getElementById("mybar");
 var width = 0;
 var id = setInterval(frame, 10);
function frame(){
  for(k = 0; k < 100; k++){
  if (width == 100)
      clearInterval(id);
      else{
        k.style.width = width;
      } 
} 


} 
}
*/


function clickCell(cell) {
  //Check if the end-user clicked on a trap
  if (cell.getAttribute("data-trap")=="true") {
    revealTraps();
    alert("Sorry, Game Over");
  }
   else {
    cell.className="clicked";
    //Count and display the number of adjacent traps
    var trapCount=0;
    var cellRow = cell.parentNode.rowIndex;
    var cellCol = cell.cellIndex;
    //alert(cellRow + " " + cellCol);
    for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,19); i++) {
      for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,19); j++) {
        if (grid.rows[i].cells[j].getAttribute("data-trap")=="true") trapCount++;
      }
    }
    cell.innerHTML=trapCount;
  
    if (trapCount==0) { 
      //Reveal all adjacent cells as they do not have a trap
      for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,19); i++) {
        for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,19); j++) {
          //Recursive Call
          if (grid.rows[i].cells[j].innerHTML=="") clickCell(grid.rows[i].cells[j]);
        }
      }
    }
    checkLevelCompletion();
  }
}