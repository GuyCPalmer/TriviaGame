$(document).ready(function() {
    // Create a function that creates the start button and initial screen
    
    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".mainArea").html(startScreen);
    }
    
    initialScreen();
    
    
    $("body").on("click", ".start-button", function(event){
        event.preventDefault(); 
        generateHTML();
    
        timerWrapper();
    
    }); 
    
    $("body").on("click", ".answer", function(event){
        //answeredQuestion = true;
        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[questionCounter]) {
            //alert("correct");
            clearInterval(theClock);
            generateWin();
        }
        else {
            //alert("wrong answer!");
            clearInterval(theClock);
            generateLoss();
        }
    }); // Close .answer click
    
    $("body").on("click", ".reset-button", function(event){
        resetGame();
    }); // Closes reset-button click
    
    });  
    
    function generateLossDueToTimeOut() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000); 
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000);
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.png'>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000); 
    }
    
    function generateHTML() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $(".mainArea").html(gameHTML);
    }
    
    function wait() {
        if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 30;
        timerWrapper();
        }
        else {
            finalScreen();
        }
    }
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                generateLossDueToTimeOut();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $(".mainArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 30;
        generateHTML();
        timerWrapper();
    }
    
    var startScreen;
    var gameHTML;
    var counter = 30;
    var questionArray = ["What is the capital of Texas?", "What state is The Masters Golf Tournament held in?", "George Washington, Thomas Jefferson, Theodore Roosevelt and Abraham Lincoln are imomrtalized on the side of a mountain in what state?", 
    "The Robin is the official bird of this state?", "This state became the first to legalize weed in 2012?", "THis state has a staggering 1,350 miles of coastline?", 
    "This city, is home to the tallest buidling in North America?", "The state responsible for introducing parking meters, thus pissing off hundreds of millions of people?"];
    var answerArray = [["Austin", "Houston", "Dallas", "San Antonio"], ["Florida","California","Georgia","South Carolina"], ["Kentucky", "Washington", "South Dakota", "New York"], ["Oregon", "Kansas", "Wisconsin", "Alabama"], 
    ["Iowa", "Nevada", "Vermont", "Colorado"], ["Florida","Alaska","Hawaii","Michigan"], ["Los Angeles", "New York City", "Houston", "Philadelphia"], ["Arizona", "New Mexico", "Wyoming", "Oklahoma"]];
    var imageArray = ["<img class='center-block img-right' src='assets/images/austin.png'>", "<img class='center-block img-right' src='assets/images/masters.png'>", "<img class='center-block img-right' src='assets/images/rushmore.png'>", 
    "<img class='center-block img-right' src='assets/images/robin.png'>", "<img class='center-block img-right' src='assets/images/weed.png'>", "<img class='center-block img-right' src='assets/images/florida.png'>", 
    "<img class='center-block img-right' src='assets/images/nyc.png'>", "<img class='center-block img-right' src='assets/images/ok.png'>"];
    var correctAnswers = ["A. Austin", "C. Georgia", "C. South Dakota", "C. Wisconsin", "D. Colorado", "A. Florida", "B. New York City", "D. Oklahoma"];
    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;
