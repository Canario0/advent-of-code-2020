function playGame(player1Deck: number[], player2Deck: number[]): string {
  /* let round = 1; */
  const cardSelected = new Set<string>();
  /* console.log(player1Deck, player2Deck); */
  while (player1Deck.length !== 0 && player2Deck.length !== 0) {
    /* console.log(`-- Round ${round} --`); */
    /* console.log(`Player 1's deck: ${player1Deck}`); */
    /* console.log(`Player 2's deck: ${player2Deck}`); */
    const roundDecks = JSON.stringify({ player1Deck, player2Deck });
    if (cardSelected.has(roundDecks)) {
      return "player1";
    } else cardSelected.add(roundDecks);
    const player1Card = player1Deck.shift();
    const player2Card = player2Deck.shift();
    /* console.log(`Player 1 plays: ${player1Card}`); */
    /* console.log(`Player 2 plays: ${player2Card}`); */
    if (
      player1Deck.length >= player1Card! &&
      player2Deck.length >= player2Card!
    ) {
      /* console.log("LenghtRound"); */
      const currPlayer1Deck = [...player1Deck.slice(0, player1Card!)];
      const currPlayer2Deck = [...player2Deck.slice(0, player2Card!)];
      /* console.log(currPlayer1Deck, currPlayer2Deck); */
      const winner = playGame(currPlayer1Deck, currPlayer2Deck);
      if (winner === "player1") {
        /* console.log("Player 1 wins the round!"); */
        player1Deck.push(player1Card!);
        player1Deck.push(player2Card!);
      } else {
        /* console.log("Player 2 wins the round!"); */
        player2Deck.push(player2Card!);
        player2Deck.push(player1Card!);
      }
    } else {
      /* console.log("Normal"); */
      if (player1Card! >= player2Card!) {
        /* console.log("Player 1 wins the round!"); */
        player1Deck.push(player1Card!);
        player1Deck.push(player2Card!);
      } else {
        /* console.log("Player 2 wins the round!"); */
        player2Deck.push(player2Card!);
        player2Deck.push(player1Card!);
      }
    }
    /* console.log(); */
    /* round++; */
  }
  return player1Deck.length >= player2Deck.length ? "player1" : "player2";
}

const player1 = [
  7,
  1,
  9,
  10,
  12,
  4,
  38,
  22,
  18,
  3,
  27,
  31,
  43,
  33,
  47,
  42,
  21,
  24,
  50,
  39,
  8,
  6,
  16,
  46,
  11,
];

const player2 = [
  49,
  41,
  40,
  35,
  44,
  29,
  30,
  19,
  14,
  2,
  34,
  17,
  25,
  5,
  15,
  32,
  20,
  48,
  45,
  26,
  37,
  28,
  36,
  23,
  13,
];

const winner: string = playGame(player1, player2);
/* console.log(`-- Post Game --`); */
/* console.log(`Player 1's deck: ${player1}`); */
/* console.log(`Player 2's deck: ${player2}`); */
const result =
  winner === "player1"
    ? player1.reverse().reduce((acc, element, i) => acc + element * (i + 1), 0)
    : player2.reverse().reduce((acc, element, i) => acc + element * (i + 1), 0);
console.log(result);
