// Rules of the game
const rules = {
  scissors: {
    scissors: [0.5, 'It\'s a draw, double scissors!'],
    rock: [0, 'Rock crushes scissors!'],
    paper: [1, 'Scissors cut paper!'],
    spock: [0, 'Spock smashes scissors!'],
    lizard: [1, 'Scissors decapitates lizard'],
  },
  rock: {
    scissors: [1, 'Rock crushes scissors!'],
    rock: [0.5, 'It\'s a draw, double rock!'],
    paper: [0, 'Paper covers rock!'],
    spock: [0, 'Spock vaporizes rock!'],
    lizard: [1, 'Rock crushes lizard!'],
  },
  paper: {
    scissors: [0, 'Scissors cut paper!'],
    rock: [1, 'Paper covers rock!'],
    paper: [0.5, 'It\'s a draw, double paper!'],
    spock: [1, 'Paper disproves spock!'],
    lizard: [0, 'Lizard eats paper!'],
  },
  spock: {
    scissors: [1, 'Spock smashes scissors!'],
    rock: [1, 'Spock vaporizes rock!'],
    paper: [0, 'Paper disproves spock!'],
    spock: [0.5, 'It\'s a draw, double Spock!'],
    lizard: [0, 'Lizard poisons Spock!'],
  },
  lizard: {
    scissors: [0, 'Scissors decapitates lizard'],
    rock: [0, 'Rock crushes lizard!'],
    paper: [1, 'Lizard eats paper!'],
    spock: [1, 'Lizard poisons Spock!'],
    lizard: [0.5, 'It\'s a draw, double Spock!'],
  },
};

// Variables
let playerScore1 = 0;
let playerScore2 = 0;
let round = 1;
let playerMove1;
let playerMove2;
let roundResult = '';

window.onload = function () {
  // This is necessary to access DOM when it has been properly loaded
  
  // Prevents page reload for all buttons
  document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
    });
  });
  
  
  // Tracks whose turn it is and displays it on the page
  const choosePlayer = (objectClass) => {
    if (playerMove1 === undefined) {
      document.querySelectorAll('button').forEach((button) => {
        button.classList.toggle('change-player')
      })
      document.querySelector('.turn').innerHTML = `Second player's turn`;
      return (playerMove1 = objectClass);
    } else if (playerMove2 === undefined) {
      document.querySelector('.turn').innerHTML = 'Both players made the move' ;
      return (playerMove2 = objectClass);
    }
  };
  
  // Adds event listeres to all buttons
  const moveListener = (objectType) => {
    document.querySelector(`.${objectType}`).addEventListener('click', () => {
      choosePlayer(`${objectType}`);
    });
  };
  moveListener('scissors');
  moveListener('rock');
  moveListener('paper');
  moveListener('spock');
  moveListener('lizard');
  
  // Tracks the number of rounds that have been played
  const roundTracker = () => {
    round += 1;
    const lastChar = round.toString().slice(-1);
    let suffix;
    if (round > 10 && round < 20) {
      suffix = 'th';
    } else if (lastChar == '1') {
      suffix = 'st';
    } else if (lastChar == '2') {
      suffix = 'nd';
    } else if (lastChar == '3') {
      suffix = 'rd';
    } else {
      suffix = 'th'
    }
    document.querySelector('.round-tracker').innerHTML = round + suffix + ' Round';
  }

  // Easter Egg Image
  const easterEgg = () => {
    if (roundResult === rules['rock']['spock'] || roundResult === rules['spock']['rock'] ) {
      document.querySelector('.easter-egg').src = `assets/spock-rock.jpg`;
    } else {
      document.querySelector('.easter-egg').src = ``;
    }
  }
  
  //Keeps track of the overall score
  const scoreTracker = () => {
    playerScore1 += roundResult[0] // roundResult variable has a limited scope
    playerScore2 += (1 - roundResult[0])
    document.querySelector('.player-1-score p').innerHTML = playerScore1;
    document.querySelector('.player-2-score p').innerHTML = playerScore2;
  }
  
  // Shows the results 
  document.querySelector('.results').addEventListener('click', () => {
    if (playerMove1 !== undefined && playerMove2 !== undefined) {
      roundResult = rules[playerMove1][playerMove2];
      document.querySelector('.progress').innerHTML = roundResult[1];
      scoreTracker();
      playerMove1 = undefined;
      playerMove2 = undefined;
      roundTracker();
      document.querySelector('.turn').innerHTML = `First player's turn`;
      document.querySelectorAll('button').forEach((button) => {
        button.classList.toggle('change-player')
      })
      easterEgg();
    }
  });
};
