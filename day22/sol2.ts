function playGame(
  player1Deck: number[],
  player2Deck: number[],
  cardNum: number
): string {
  let round = 1;
  const cardSelected = new Set<string>();
  console.log(player1Deck, player2Deck, cardNum);
  while (player1Deck.length !== 0 && player2Deck.length !== 0) {
    // if (player1Deck.length === 0) return "player2";
    // if (player2Deck.length === 0) return "player1";
    console.log(`-- Round ${round} --`);
    console.log(`Player 1's deck: ${player1Deck}`);
    console.log(`Player 2's deck: ${player2Deck}`);
    const player1Card = player1Deck.shift();
    const player2Card = player2Deck.shift();
    if (cardSelected.has(`${player1Card},${player2Card}`)) {
      player1Deck.push(player1Card!);
      player1Deck.push(player2Card!);
      return "player1";
    } else cardSelected.add(`${player1Card},${player2Card}`);
    console.log(`Player 1 plays: ${player1Card}`);
    console.log(`Player 2 plays: ${player2Card}`);
    if (
      player1Deck.length >= player1Card! &&
      player2Deck.length >= player2Card!
    ) {
      console.log("LenghtRound");
      const currPlayer1Deck = [...player1Deck.slice(0, player1Card!)];
      const currPlayer2Deck = [...player2Deck.slice(0, player2Card!)];
      const currNum = currPlayer1Deck.length + currPlayer2Deck.length;
      console.log(currPlayer1Deck, currPlayer2Deck, currNum);
      const winner = playGame(currPlayer1Deck, currPlayer2Deck, currNum);
      if (winner == "player1") {
        console.log("Player 1 wins the round!");
        player1Deck.push(player1Card!);
        player1Deck.push(player2Card!);
      } else {
        console.log("Player 2 wins the round!");
        player2Deck.push(player2Card!);
        player2Deck.push(player1Card!);
      }
    } else {
      console.log("Normal");
      if (player1Card! >= player2Card!) {
        console.log("Player 1 wins the round!");
        player1Deck.push(player1Card!);
        player1Deck.push(player2Card!);
      } else {
        console.log("Player 2 wins the round!");
        player2Deck.push(player2Card!);
        player2Deck.push(player1Card!);
      }
    }
    console.log();
    round++;
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
// const player1 = [9, 2, 6, 3, 1];
// const player2 = [5, 8, 4, 7, 10];

const cardNum = player1.length + player2.length;
const winner: string = playGame(player1, player2, cardNum);
console.log(`-- Post Game --`);
console.log(`Player 1's deck: ${player1}`);
console.log(`Player 2's deck: ${player2}`);

console.log(
  player1.reverse().reduce((acc, element, i) => acc + element * (i + 1), 0)
);
console.log(
  player2.reverse().reduce((acc, element, i) => acc + element * (i + 1), 0)
);
// console.log(result);
