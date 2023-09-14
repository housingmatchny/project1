//specifies the game function

class MemoryGame {
    constructor(cards) {
      this.cards = cards;
      this.playCards = null
      //this.easyCards = cards.slice(0,6)  //combining 1 & 2, this.cards = this.easyCards = first 6 cards
      this.pickedCards = [];
      this.pairsClicked = 0;
      this.pairsGuessed = 0;
    }
  
      shuffleCards() {
        if(!this.cards){
          return undefined
        }

        let counter = 0

        let cardArray = []

        while (counter < 6) {
          let card = this.cards.splice((Math.random() * 1000) % this.cards.length, 1)[0]
          console.log("This is the card====>", card)
          cardArray.push(card)
          counter++
        }
        
        //duplicate cards
        const dupCards = [...cardArray, ...cardArray]; //same as concat, arr1.concat(arr2)

        //set the initial length to the full length of the array so that we can shuffle through all the cards; then we shuffle(swap) cards randomly
        for(let i = dupCards.length - 1; i > 0; i--){
            let randomIndex = Math.floor(Math.random() * i)
            let temp = dupCards[i] //temporarily holds current position
            dupCards[i] = dupCards[randomIndex]//switching positions with temp
            dupCards[randomIndex] = temp//switching positions with random
        }
        
        this.playCards = dupCards
        console.log("Final Array", this.cards)
      }
  //boolean result
    checkIfPair(cardname1, cardname2){
      this.pairsClicked++;
      if (cardname1===cardname2){
        this.pairsGuessed++;
          return true;
      }
          return false;
    }

    //boolean results
    checkIfFinished() {
      if(this.pairsGuessed === this.cards.length/2){
        return true;
      }else{
         return false;
      }
    }
  }
 