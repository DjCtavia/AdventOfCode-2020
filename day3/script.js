const path = require('path');
const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, 'input.txt')),
    console: false
});

// Containing numbers input
let map = [];
let mapXLimit;

readInterface.on('line', (line) => {
    map.push(line);
});

readInterface.on('close', () => {
    mapXLimit = map[0].length;
    Part1();
    Part2();
});

function FightTheSlope(xSpeed, ySpeed) {
    let curPos = {x: 0, y: 0};
    let hitedTrees = 0;

    while (curPos.y < map.length) {
        if (map[curPos.y][curPos.x] === '#')
            hitedTrees++;
        curPos.x = (curPos.x + xSpeed) % mapXLimit;
        curPos.y += ySpeed;
    }
    return hitedTrees;
}

function Part1() {
    console.log("--- Part 1 ---");
    console.log(`Number of hited trees: ${FightTheSlope(3, 1)}`);
}

function Part2() {
    console.log("--- Part 2 ---");
    const slope1 = FightTheSlope(1, 1);
    const slope2 = FightTheSlope(3, 1);
    const slope3 = FightTheSlope(5, 1);
    const slope4 = FightTheSlope(7, 1);
    const slope5 = FightTheSlope(1, 2);

    console.log(`Let's multiply the trees we took in our face last times... ${slope1 * slope2 * slope3 * slope4 * slope5}`);
}