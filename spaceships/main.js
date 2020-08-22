// CLASS CONSTRUCTORS

console.log('%c Spaceship Battle!', 'color: blue; font-size: 20px')

class Spaceship {
  constructor(hull, firepower, accuracy) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }
  attackAlien(enemy) {
    enemy.hull -= this.firepower;
  }
}

class AlienShip {
  constructor() {
    this.hull = Math.floor((Math.random() * 6) + 4);
    this.firepower = Math.floor((Math.random() * 3) + 3);
    this.accuracy = Math.floor((Math.random() * 4) + 6) / 10;
  }
  attackHuman(enemy) {
    enemy.hull -= this.firepower;
  }
}

// HELPER FUNCTIONS


const createAlienFleet = (amount) => {
  let aliens = [];
  while(amount > 0) {
    aliens.push(new AlienShip());
    amount--;
  }
  return aliens;
}

const didShipSurvive = (ship) => {
  return ship.hull > 0;
}

const isAlienFleetDestroyed = (fleet) => {
  return fleet.length === 0;
}

const playRound = (human, alien) => {
  console.log('---------------')
  console.log("Starting new round!");
  roundWon = false;
  while (alien.hull > 0 && human.hull > 0) {
    console.log('%c Attacking the alien ship!', 'color: green');
    myShip.attackAlien(alien);
    console.log(`Alien's hull: ${alien.hull}`)
    if (didShipSurvive(alien)) {
      console.log('%c alien is attacking!', 'color: red');
      alien.attackHuman(myShip);
      console.log(`Your hull: ${human.hull}`);
    } else {
      console.log("%c You won this round!", 'font-weight: bold');
      roundWon = true;
    }
  }
}

const playGame = (humanShip, fleet) => {
  while(humanShip.hull > 0 && fleet.length > 0) {
    playRound(humanShip, fleet[0]);
    if (roundWon) {
      fleet.shift();
    }
  }
  if (isAlienFleetDestroyed(fleet)) {
    console.log('%c You destroyed all the aliens! You win!', 'color: green; font-size: 16px')
  } else if (!didShipSurvive(humanShip)) {
    console.log('%c Aliens destroyed your ship. You lose!', 'color: red; font-size: 16px')
  }
}

// SHIPS and GAME STATE

var myShip = new Spaceship(20, 5, .7);
var alienFleet = createAlienFleet(6);

let roundWon = false;

// EVENT LISTENERS

document.getElementById('start-game').addEventListener('click', () => {
  playGame(myShip, alienFleet);
})





