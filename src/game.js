//specifies the game function

class MemoryGame {
    constructor(cards) {
      this.cards = cards;
      //this.easyCards = cards.slice(0,6)  //combining 1 & 2, this.cards = this.easyCards = first 6 cards
      this.pickedCards = [];
      this.pairsClicked = 0;
      this.pairsGuessed = 0;
    }
  
      shuffleCards() {
        if(!this.cards){
          return undefined
        }
        
        //duplicate cards randomly
        const dupCards = [...this.cards, ...this.cards]; //same as concat, arr1.concat(arr2)

        for(let i = dupCards.length - 1; i > 0; i--){
            let randomIndex = Math.floor(Math.random() * i)
            let temp = dupCards[i] //temporarily holds current position
            dupCards[i] = dupCards[randomIndex]//switching positions with temp
            dupCards[randomIndex] = temp//switching positions with random
        }
        
        this.cards = dupCards
      }
  
    checkIfPair(cardname1, cardname2){
      this.pairsClicked++;
      if (cardname1===cardname2){
        this.pairsGuessed++;
          return true;
      }
          return false;
    }
  
    checkIfFinished() {
      if(this.pairsGuessed === this.cards.length/2){
        return true;
      }else{
         return false;
      }
    }
  }
 