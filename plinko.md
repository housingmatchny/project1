*this.cards* - MemoryGame's cards
    > *cards* that are passed into the game
        > *radicals (data)* that are passed in as the cards

picked Cards -- stores the cards the user has clicked so we can compare them
pairs Clicked -- # pairs clicked 
pairsGuessed -- # actual pairs -- score

checkIfPair(cardname1, cardname2) --  add 1 to our pairsClicked property regardless, and 1 to pairsGuessed if they the card names are the same. Boolean result: true if card names are equal, false otherwise.

checkIfFinished() -- have we reached the numbers of pairs the game has?

Need to add
- 

//TODO if they are pairs, filter the data array to get the document with the matching definition of one of the pickedCards   
//from the filter, we attribute the value of "filtered[0].english" to the prompt

key:value
cards:data