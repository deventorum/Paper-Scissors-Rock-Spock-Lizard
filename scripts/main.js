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
const round = 1;
const playerScore1 = 0;
const playerScore2 = 0;
let playerMove1;
let playerMove2;
console.log(playerMove1);

window.onload = function () {
  // This is necessary to access DOM when it has been properly loaded

  // Prevents page reload for all buttons
  document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('button has been clicked');
    });
  });


  // Tracks whose turn it is
  const choosePlayer = (objectClass) => {
    if (playerMove1 === undefined) {
      return (playerMove1 = objectClass);
    } else if (playerMove2 === undefined) {
      return (playerMove2 = objectClass);
    } else {
      console.log('Both players made their moves');

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


  document.querySelector('.results').addEventListener('click', () => {
    if (playerMove1 !== undefined && playerMove2 !== undefined) {
      const roundResult = rules[playerMove1][playerMove2];
      document.querySelector('.progress').innerHTML = roundResult[1];
      playerMove1 = undefined;
      playerMove2 = undefined;
    } else {
      console.log('something did not work!');
    }
  });
};
