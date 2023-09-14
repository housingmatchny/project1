//brings everything together

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
    },
]

/*

memoryGame.shuffleCards(); [{}, {}, {}...]

firstThree [
  {id: 1} unique id
  {id: 2}
  {id: 3}
]

let tempArr = [];

for (let i = 0: i < data.length; i++) {
  if (tempArr.)
}


newArrrOfObjects = arrOfObjects.map(object => {
  const secondThree = 

  if ()
})
*/

const memoryGame = new MemoryGame(data);//triggers game constructor
//creates instance of game, passing in data for the cards
//class is the blueprint; new keyword calls the blueprint to be implemented; the instances are the new houses 

// console.log(`This is memoryGame ${memoryGame}`, memoryGame);

window.onload = () => {
  let boardHTML = '';
  let filteredPrompt;

  //shuffleCards
  memoryGame.shuffleCards();

  memoryGame.cards.forEach((el) => {
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

  // Add all the divs to the respective HTML sections within the event listener function
  document.querySelector('#prompt').innerHTML += `<h2>${filteredPrompt}</h2>`
  document.querySelector('#memory-board').innerHTML = boardHTML;

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
                    
                    //filter data for english name (which will be passed into prompt);
                    filteredPrompt = memoryGame.cards.filter(el => el.english.includes(memoryGame.pickedCards[0].english));

                    //check if game is finished  
                    const isFinished = memoryGame.checkIfFinished();
                    if (isFinished) {
                        alert("Congrats! You're ready to move to the next level!");
                    }
                    memoryGame.pickedCards = [];
                    return;
                  } else {

                  //if the return from checkIfPair is FALSE, flip them back after 3 seconds
                    setTimeout(() => {
                        memoryGame.pickedCards[0].classList.remove("turned");
                        memoryGame.pickedCards[1].classList.remove("turned");
                        memoryGame.pickedCards = [];
                    }, 3000);
                }
            }

            console.log(`Card clicked:`, card);
        });
    });
};