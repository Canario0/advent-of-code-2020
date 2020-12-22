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
11
]

const player2= [
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
13
]

const cardNum = player1.length + player2.length;
let round = 1;
while(player1.length !== cardNum && player2.length !== cardNum){
    /*console.log(`-- Round ${round} --`);
    console.log(`Player 1's deck: ${player1}`);
    console.log(`Player 2's deck: ${player2}`);*/
    const player1Card = player1.shift();
    const player2Card = player2.shift();
    /*console.log(`Player 1 plays: ${player1Card}`);
    console.log(`Player 2 plays: ${player2Card}`);*/
    if(player1Card! > player2Card!){
        //console.log('Player 1 wins the round!');
        player1.push(player1Card!);
        player1.push(player2Card!);
    }else{
        //console.log('Player 2 wins the round!');
        player2.push(player2Card!);
        player2.push(player1Card!);
    }
    //console.log();
    round ++;
}
console.log(`-- Post Game --`);
console.log(`Player 1's deck: ${player1}`);
console.log(`Player 2's deck: ${player2}`);

const result = player1.length === 0 ? player2.reverse().reduce((acc, element, i) => acc + (element * (i+1)),0) : player1.reverse().reduce((acc, element, i) => acc + (element * (i+1)),0);
console.log(result)
