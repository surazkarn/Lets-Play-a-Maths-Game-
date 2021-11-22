var playing = false;
var score;
var action;
var correctAnswer;

//if we click on the start/reset button
document.getElementById("start-reset").onclick = function() {
   //if we are playing
   if(playing === true){
     //reload page
     location.reload();
   } else {
    
    //if we are not playing
    playing = true;
    //set score to 0
    score = 0;
    document.getElementById("score-value").innerHTML = score;
    //show countdown box
    show("time-remaining");
    //hide game over box
    hide("game-over");
    //reduce time 
    countdownFrom(60);
    //change button text to reset
    document.getElementById("start-reset").innerHTML = "Reset Game";
    //generate new Q&A
    generateQA();
   }
   
  
}
 

//if we click on an answer box
for (var i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function() {
    //if we are playing
    if (playing === true) {
      //correct?
      if (this.innerHTML == correctAnswer){
        //yes
        //increase score 
        score++;
        document.getElementById("score-value").innerHTML = score;
        //show the correct box for 1 sec
        hide("wrong");
        show("correct");
        setTimeout(function(){
          hide("correct");
        }, 1000);
          //generate new Q&A
          generateQA();
      } else {
        //no
          //show try again for 1 sec
          hide("correct");
          show("wrong");
          setTimeout(function(){
            hide("wrong");
          }, 1000);
      }
        
    }
      
  }
}
  


//Function
//start countdown
var countdownFrom = function(num) {
  document.getElementById("time-remaining-value").innerHTML = num;
  action = setInterval(function() {
   //yes->continue
  num -= 1;
  document.getElementById("time-remaining-value").innerHTML = num;
  if (num === 0) {
    //no-> game over
    stopCountdown();
    show("game-over");
    document.getElementById("game-over").innerHTML = "<p>game over</p><p>Your score is " + score + "</p>";
    hide("time-remaining");
    hide("correct");
    hide("wrong");
    document.getElementById("start-reset").innerHTML = "Start Game";
    playing = false;
 }
  }, 1000)
}

//stop countdown
var stopCountdown = function() {
  clearInterval(action);
}

//hide an element
var hide = function(id){
  document.getElementById(id).style.display = "none";
}

//show an element
var show = function(id) {
  document.getElementById(id).style.display = "block";
}

//generate a question and answer
var generateQA = function() {
  var x = Math.round(Math.random()*9) + 1;
  var y = Math.round(Math.random()*9) + 1;
  correctAnswer = x*y;
  var correctPosition = Math.round(Math.random()*3) + 1;
  document.getElementById("question").innerHTML = x + "x" + y;
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer;
  var answers = [correctAnswer];
  for (var i = 1; i < 5; i++){
    if(i !== correctPosition){
      var wrongAnswer;
      do{
        wrongAnswer = (Math.round(Math.random()*9) + 1) * (Math.round(Math.random()*9) + 1);
      }while(answers.indexOf(wrongAnswer) > -1) {
        document.getElementById("box" + i).innerHTML = wrongAnswer;
        answers.push(wrongAnswer);
      }
    }
  }
}