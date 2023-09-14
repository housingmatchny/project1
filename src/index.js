//brings everything together

// import { radicalsRaw } from '../data/radicals.js'

const data = 
[
  {
    id: 1,
    radical: "一",
    pinyin: "yī",
    english: "one",
    strokeCount: 1
  },
  {
    id: 2,
    radical: "丨",
    pinyin: "shù",
    english: "line",
    strokeCount: 1
  },
  {
    id: 3,
    radical: "丶",
    pinyin: "diǎn",
    english: "dot",
    strokeCount: 1
  },
  {
    id: 4,
    radical: "丿",
    pinyin: "piě",
    english: "slash",
    strokeCount: 1
  },
  {
    id: 5,
    radical: "乙",
    pinyin: "yǐ",
    english: "second",
    strokeCount: 1
  },
  {
    id: 6,
    radical: "亅",
    pinyin: "gōu",
    english: "hook",
    strokeCount: 1
  }
]

// const memoryGame = new MemoryGame(radicalsRaw);//triggers game constructor; selects first 6 cards of shuffled deck
//creates instance of game, passing in data for the cards
//class is the blueprint; new keyword calls the blueprint to be implemented; the instances are the new houses 

//make the variables global
let memoryGame
// let score = 0;

//Executes immediately after a page has been loaded
window.onload = () => {

  //on load, create new instance of game and start the game
  let timerElement = document.getElementById('timer')
  memoryGame = new MemoryGame(radicalsRaw, timerElement)
  startGame() //for a function only, we can invoke the function before declaring; exception: arrow notation
  memoryGame.startTimer() 
}


function startGame() {

  if (document.getElementsByClassName('restart-button')[0]) {
    // let parent = document.getElementsByTagName('body')
    let button = document.getElementsByClassName('restart-button')[0] //geteElements method returns an array; hence [0] is an index of the array
    button.remove() //if the Next button is still there, remove it so we do not have dup buttons
  }

  memoryGame.pairsClicked = 0
  memoryGame.pairsGuessed = 0
  memoryGame.pickedCards = []

  document.querySelector('#prompt').innerHTML = `<h3></h3>`;
  // let scoreTag = document.getElementById('score')
  // scoreTag.innerText = `Score: ${score}`
  document.querySelector('#score').innerHTML = `<h3>Score: ${memoryGame.score}</h3>`

    console.log("Raw", radicalsRaw)  
    let boardHTML = '';
    let showPrompt = '';


  //shuffleCards
  memoryGame.shuffleCards();

  //sets up cards and text on cards
    memoryGame.playCards.forEach((el) => {
      boardHTML += `
        <div class="card" name="${el.english}">
          <div class="face-down" name="${el.english}"></div>
          <div class="face-up" name="${el.english}">
            <h3>${el.radical}</h3>
            <p>${el.pinyin}</p>
            </div>
          </div>
        `;
    });

    // Add all the divs to the respective HTML section within the event listener function
    document.querySelector('#memory-board').innerHTML = boardHTML;
    // document.querySelector('#score').innerHTML = score;


      // Bind the click event of each element to a function
      document.querySelectorAll('.card').forEach((card) => {
          card.addEventListener('click', () => {
          
            //when clicked, push cards into the pickedCards arr for comparison; up to 2 at a time
              if (memoryGame.pickedCards.length < 2) {
                  memoryGame.pickedCards.push(card);
                  card.classList.toggle("turned");
              } //ends if statement

              // check if pickedCards arr has length of 2 cards, then call checkIfPair method
              if (memoryGame.pickedCards.length === 2) {
                  const pairs = memoryGame.checkIfPair(
                      memoryGame.pickedCards[0].getAttribute("name"), //yi
                      memoryGame.pickedCards[1].getAttribute("name")  //yi
                  ); //result: TRUE

                    //if pickedCards arr has length of 2 (i.e., checkIfPair is true), 
                    //keep the cards turned;                 
          
                  if (pairs) {
                      memoryGame.pickedCards[0].classList.add("blocked");
                      memoryGame.pickedCards[1].classList.add("blocked");
                      
                      memoryGame.score++;
                      document.querySelector('#score').innerHTML = `<h3>Score: ${memoryGame.score}</h3>`;// = reassign; =+ concat
                      
                      //show english definition as prompt        
                      showPrompt = memoryGame.pickedCards[0].getAttribute("name");
                      document.querySelector('#prompt').innerHTML = `<h3>${showPrompt}</h3>`;

                      //check if game is finished  
                      let isFinished = memoryGame.checkIfFinished();
                      if (isFinished) {
                        // setTimeout(() => alert("Congrats! You did it!! 🥳"),3000);
                        
                        let refreshButton = document.createElement('button')//set id of button; html will know that this is a button
                        refreshButton.setAttribute('class', 'restart-button')
                        refreshButton.innerHTML = 'Next'

                        refreshButton.addEventListener('click', () => {
                          startGame()
                        })

                        let parent = document.getElementsByTagName('body')[0]

                        parent.appendChild(refreshButton)

                        // showPrompt = ''

                        document.querySelector('#prompt').innerHTML = `<h3>${showPrompt}</h3>`;

                      }
                      memoryGame.pickedCards = [];
                      return;
                    } else {

                    //if the return from checkIfPair is FALSE, flip them back after 2 seconds
                      setTimeout(() => {
                          memoryGame.pickedCards[0].classList.remove("turned");
                          memoryGame.pickedCards[1].classList.remove("turned");
                          memoryGame.pickedCards = [];
                      }, 500);
                  }
              }

              console.log(`Card clicked:`, card);
          });
      });





}


//const memoryGame = new MemoryGame(data.slice(5,6))//start index 5, slice 6