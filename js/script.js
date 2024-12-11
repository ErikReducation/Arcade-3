//requirements
//Track statistics
//Number of games played
//Number of total wins
//Win percentage
//Display these in farewell as HTML table



//global variables, all functions must be able to access 

//for name entry
let nameEmpty = true;
let nameTag = "";
let nameValid = false;

//for loop controls
let playAgain = '';//dummy checkstring
let valid = false;//dummy bool for input sanitization dowhile loops

//statistics
let timesPlayed = 0;
let wins = 0;

//functions

function buildMyTable() { //build the results table. In function because it's something I want to do multiple times 
    //and I don't want to write this code 3 times. Can't be a variable at the top of the js file because it will be initialized once
    //and won't be updated, even if used in a template literal later. It's pretty cool that you can put template literals
    //in a function and then put a function into template literals and add that to HTML!
    let baseTable = `<br><br>
    <table name="resultsTable" id="resultsTable">
    <tr>
        <th>Games Played</th>
        <th>Wins</th>
        <th>Win Percentage</th>
    </tr>
    <tr>
        <td>${timesPlayed}</td>
        <td>${wins}</td>
        <td>${(wins/timesPlayed)*100}%</td>
    </tr>
    </table>`;
    let medal = '';
    switch (wins) {
    }
    return baseTable;
}

function guess() {//guessing game

let doneGuessing = false;//loop control variable

//handle first session name
if (nameEmpty) {
    do {
    nameTag = prompt("Welcome to the arcade, and thanks for playing. What's your name?");
    if (nameTag != null && nameTag.trim().length!=0){//sanitize name
        nameEmpty = false;
        nameValid = true;
    } else {//tell user to try again
        alert("Names must not be empty and should contain at least one non-whitespace character.");
    }
    } while (!nameValid)
} 
//game loop
do {
    let targetNum = Math.floor(Math.random() * 10) +1;//get a number to guess
	let latestGuess = prompt(`${nameTag}, guess a number between 1 and 10.`);//initialize variable for while loop
	let tries =0;//count tries for this guessing game session

    timesPlayed++;//iterate timesPlayed at the beginning of gameloop for accurate counting

	while (latestGuess != targetNum) {//enter loop
    if (latestGuess === null){//cancel
        latestGuess = prompt(`Nice try, ${nameTag}! You have to guess a number.`);
		tries++;
    }
	else if (latestGuess.trim().length === 0){//ok, empty, or whitespace
        latestGuess = prompt(`Nice try, ${nameTag}! You have to guess a number.`);
		tries++;

    }else if (latestGuess > targetNum) {//guess higher than target
		latestGuess = prompt(`${nameTag}, guess was too high, guess again.`);
		tries++;
		
	} else if (latestGuess < targetNum) {//guess less than target
		latestGuess = prompt(`${nameTag}, guess was too low, guess again.`);
		tries++;
	} else {//letters and special characters
		latestGuess = prompt(`Nice try, ${nameTag}! You have to guess a number.`);
		tries++;
	}
	}
	if (tries >0) {//if entered loop
        tries++;//due to using pretest loop vs post test loop, last correct try is not counted because loop is not entered.
		alert(`${nameTag}, you guessed it in ${tries} guesses!`);
        wins++;
	} else {//if skipped loop
		alert(`Wow! ${nameTag}, you guessed it right on your first try!`);
        wins++;
	}//It is only possible to win playing the guessing game because one complete game requires you find the right answer. 
     //This makes it a great game to play if you're trying for a high score at the arcade.. haha.

//play again?
    do {
    playAgain = prompt(`${nameTag}, Would you like to keep playing this game? y/n`);
    if (playAgain != null)//sanitize before calling tolowercase
    {
        if (playAgain.toLowerCase() === "y"){//keep playing
        doneGuessing = false;
        valid = true;
        } else if (playAgain.toLowerCase() === "n"){//exit this game
        doneGuessing = true;
        valid = true;
        } else {//input isn't y or n
        alert(`${nameTag}, input should be Y or N, case insensitive!`);
        valid = false;
        }
    } else {//input is null
        alert(`${nameTag}, input should be Y or N, case insensitive!`);
        valid = false;
    }
    } while (!valid)
} while (!doneGuessing)


//handle done with play session prompt (sends user back to buttons or to goodbye)
do {
    playAgain = prompt(`${nameTag}, Would you like to pick another game to play? y/n`);
    if (playAgain != null)//sanitize before calling tolowercase
    {
        if (playAgain.toLowerCase() === "y"){
        valid = true;//exit this loop, then exit function, so returns to main game session loop
        } else if (playAgain.toLowerCase() === "n"){//exit main game session loop
        //html will be overwritten to goodbye, reset button, and table.
        document.getElementById("main").innerHTML = `Goodbye, ${nameTag}. May we meet again! <br><br>`//overwrite buttons
        document.getElementById("main").innerHTML += "<button onClick='window.location.href=window.location.href'>Reset</button>"//add reset button
        document.getElementById("main").innerHTML += `${buildMyTable()}`;
        valid = true;
        } else {//input isn't y or n
        alert(`${nameTag}, input should be Y or N, case insensitive!`);
        valid = false;
        }
    } else {//input is null
        alert(`${nameTag}, input should be Y or N, case insensitive!`);
        valid = false;
    }
} while (!valid)

} 

let delphi = function() {//magic eight ball
    
//variables

let input = "";
let doneSoothing = false;
let fateIndex = 0;
const fates = [
    'Your fortunes are grim. Bathe in holy water, do not enter cemeteries for a month, and refrain from starting fires. \n The answer is no.' ,//bad
    'Your fortunes speak of misery and anguish. Beware water. Beware caves. Travel to a holy place and beg forgiveness. \n The answer is no.' ,
    'Your fortunes are obscured. I cannot penetrate the clouds you have laid over your life. \n Try again.' ,//ask again
    'Fate is not accepting visitors today. \n Try again.' ,
    'Magic is not real! Read a book! \n Undecided.' ,//neither lucky nor unlucky
    'Fortune has deserted you. You are neither lucky nor unlucky. Your profits and losses are yours to own. \n Undecided.' ,
    'Fortune smiles upon you. Talk to your ex. \n The answer is yes.' ,//go for it
    'Fortune favors you. Bless those around you, and your luck will be magnified. Your favorite artist will release a new album shortly. \n The answer is yes.'
];

//handle first session name
if (nameEmpty){
    do {
    nameTag = prompt("Welcome to the arcade, and thanks for playing. What's your name?");
    if (nameTag != null && nameTag.trim().length!=0){//sanitize name
        nameEmpty = false;
        nameValid = true;
    } else {//tell user to try again
        alert("Names must not be empty and should contain at least one non-whitespace character.");
    }
    } while (!nameValid)
} 
//game loop

    //gameplay loop
    do {
        timesPlayed++;
        do {
        input = prompt(`Hello, ${nameTag}. Ask your question, and your fortune will be revealed by the magic ball.`);
        if (input != null && input.trim().length!=0) //check for whitespace string, empty string, or cancelled prompt
        {
            fateIndex = getRandomInt(8);//assigns fateIndex to 0-7, the start and end of my array
	    //check to see if magic 8 ball result is win
	    if (fateIndex === 6 || fateIndex === 7) {
		wins++;
	    }
            alert(fates[fateIndex]);//Get fortune
            valid = true;
        }
        else // Bad input
        {
            alert(`${nameTag}, you have to ask a question!`);
            valid = false;
        }
        } while (!valid)
        //play again?

        do {
            playAgain = prompt(`${nameTag}, Would you like to keep playing this game? y/n`);
            if (playAgain != null)//sanitize before calling tolowercase
            {
                if (playAgain.toLowerCase() === "y"){
                doneSoothing = false;
                valid = true;
                } else if (playAgain.toLowerCase() === "n"){//exit this game
                doneSoothing = true;
                valid = true;
                } else {//input isn't y or n
                alert(`${nameTag}, input should be Y or N, case insensitive!`);
                valid = false;
                }
            } else {//input is null
                alert(`${nameTag}, input should be Y or N, case insensitive!`);
                valid = false;
            }
            } while (!valid)

    } while (!doneSoothing)
    


//handle done with play session prompt (sends user back to buttons or to goodbye)
do {
    playAgain = prompt(`${nameTag}, Would you like to pick another game to play? y/n`);
    if (playAgain != null)//sanitize before calling tolowercase
    {
        if (playAgain.toLowerCase() === "y"){
        valid = true;//exit this loop, then exit function, so returns to main game session loop
        } else if (playAgain.toLowerCase() === "n"){//exit main game session loop
        //html will be overwritten to goodbye, reset button, and table.
        document.getElementById("main").innerHTML = `Goodbye, ${nameTag}. May we meet again! <br><br>`//overwrite buttons
        document.getElementById("main").innerHTML += "<button onClick='window.location.href=window.location.href'>Reset</button>"//add reset button
        document.getElementById("main").innerHTML += `${buildMyTable()}`;
        valid = true;
        } else {//input isn't y or n
        alert(`${nameTag}, input should be Y or N, case insensitive!`);
        valid = false;
        }
    } else {//input is null
        alert(`${nameTag}, input should be Y or N, case insensitive!`);
        valid = false;
    }
} while (!valid)

//Internal soothing functions
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}    
};

let gladiator = () => {//bear ninja hunter

//variables

const halStrat = ['bear', 'ninja', 'hunter'];//computer options
let halChoice = 0; //default bear
let userChoice = '';
let doneFighting = false;//gameplay loop control
let winTotal = 0;//internal scoreboard for one game session (user enters "y", play BNH again)
let loseTotal = 0;//""
let tieTotal = 0;//""
let currentDate = null;//for countdown
let outcome = ''; //stores result of switch 

//handle first session name
if (nameEmpty){
    do {
    nameTag = prompt("Welcome to the arcade, and thanks for playing. What's your name?");
    if (nameTag != null && nameTag.trim().length!=0){//sanitize name
        nameEmpty = false;
        nameValid = true;
    } else {//tell user to try again
        alert("Names must not be empty and should contain at least one non-whitespace character.");
    }
    } while (!nameValid)
}
//game loop

do {
    timesPlayed++;//iterate global counter
    alert("Hi " + nameTag + " Let\'s Play!");

    halChoice = halStrat[Math.floor(Math.random() * 3)]; // computer rolls one of 3 from array at random. Possible values: 0,1,2 => bear, ninja, hunter
    //user picks one of three roles
	do {       
        userChoice = prompt('Who are you: Bear, Ninja, or Hunter?');
	    if (userChoice != null) {
	        userChoice = userChoice.toLowerCase();//cant use tolowercase on null string, gotta check first
	    if (userChoice === 'bear' || userChoice === 'ninja' || userChoice === 'hunter'){
	        valid = true;
	    } else //bad input
	    {
	        valid = false;
	        alert(`${nameTag}, that's an invalid input. Input must be Bear, Ninja, or Hunter, case insensitive.`);
	    }
	    } else {// clicked cancel
	        valid = false;
	        alert(`${nameTag}, that's an invalid input. Input must be Bear, Ninja, or Hunter, case insensitive.`);
	    }
	} while (!valid)

//countdown with no html
console.log(3); 
//wait 1 second
date = Date.now();//code lifted from https://www.sitepoint.com/delay-sleep-pause-wait/
currentdate = null;
do {
    currentDate = Date.now();
} while (currentDate - date < 1000);// very dangerous. Can cause crashes

console.log(2); 
//wait
date = Date.now();//code lifted from https://www.sitepoint.com/delay-sleep-pause-wait/
currentdate = null;
do {
	currentDate = Date.now();
} while (currentDate - date < 1000);// very dangerous. Can cause crashes

console.log(1); 
//wait
date = Date.now();//code lifted from https://www.sitepoint.com/delay-sleep-pause-wait/
currentDate = null;
do {
currentDate = Date.now();
} while (currentDate - date < 1000);// very dangerous. Can cause crashes

console.log(0);
alert(`${nameTag} you picked ${userChoice}! The computer picked ${halChoice}!`);

//game logic

let lineup;
if (halChoice === 'bear') {
    if (userChoice === 'bear') {
        lineup = 1;
    }
    else if (userChoice === 'ninja') {
        lineup = 9;
    } else { //user picked hunter
        lineup = 6;
    }
}
else if (halChoice === 'hunter') {
    if (userChoice === 'bear') {
        lineup = 8;
    }
    else if (userChoice === 'ninja') {
        lineup = 5;
    } else { //user picked hunter
        lineup = 3;
    }
        }
else if (halChoice === 'ninja') {
    if (userChoice === 'bear') {
        lineup = 4;
    }
    else if (userChoice === 'ninja') {
        lineup = 2;
    } else { //user picked hunter
        lineup = 7;
    }
} else {}

//partitioned switch
switch (lineup) {
    case 1:
    case 2:
    case 3:
        outcome = 'tie';
        break;
    case 4:
    case 5:
    case 6:
        outcome = 'win';
        break;
    case 7:
    case 8:
    case 9:
        outcome = 'lose';
        break;
    default://shouldn't be possible but you never know
        outcome = 'lose';
        console.log("How did this even happen?");
        break;
}

//results

if (outcome === 'win') {
alert(`${nameTag}, you Win!!`);
winTotal++;//increment for overall stats for this game session
wins++;//global tracker for play session
}
//lose
else if (outcome === 'lose') {
alert(`${nameTag}, you Lose!!`);
loseTotal++;
}
//tie
else {
alert(`${nameTag}, it\'s a tie.`);
tieTotal++;
}

//play again?

do {
    playAgain = prompt(`${nameTag}, Would you like to keep playing this game? y/n`);
    if (playAgain != null)//sanitize before calling tolowercase
    {
        if (playAgain.toLowerCase() === "y"){
        doneFighting = false;
        valid = true;
        } else if (playAgain.toLowerCase() === "n"){//exit this game
        doneFighting = true;
        valid = true;
        } else {//input isn't y or n
        alert(`${nameTag}, input should be Y or N, case insensitive!`);
        valid = false;
        }
    } else {//input is null
        alert(`${nameTag}, input should be Y or N, case insensitive!`);
        valid = false;
    }
    } while (!valid)


} while (!doneFighting)




//alert overall results, then exit to landing page or to goodbye
alert(`You won ${winTotal} time(s), lost ${loseTotal} time(s), and tied ${tieTotal} time(s). Congratulations, ${nameTag}!`);

//handle done with play session prompt (sends user back to buttons or to goodbye)
do {
    playAgain = prompt(`${nameTag}, Would you like to pick another game to play? y/n`);
    if (playAgain != null)//sanitize before calling tolowercase
    {
        if (playAgain.toLowerCase() === "y"){
        valid = true;//exit this loop, then exit function, so returns to main game session loop
        } else if (playAgain.toLowerCase() === "n"){//exit main game session loop
        //html will be overwritten to goodbye, reset button, and table.
        document.getElementById("main").innerHTML = `Goodbye, ${nameTag}. May we meet again! <br><br>`//overwrite buttons
        document.getElementById("main").innerHTML += "<button onClick='window.location.href=window.location.href'>Reset</button>"//add reset button
        document.getElementById("main").innerHTML += `${buildMyTable()}`;
        valid = true;
        } else {//input isn't y or n
        alert(`${nameTag}, input should be Y or N, case insensitive!`);
        valid = false;
        }
    } else {//input is null
        alert(`${nameTag}, input should be Y or N, case insensitive!`);
        valid = false;
    }
} while (!valid)

};
