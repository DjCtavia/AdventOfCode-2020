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
});

function Part1() {
    console.log("---Part 1 ---");
    let curPos = {x: 0, y: 0};
    let posSpeed = {x: 3, y: 1};
    let hitedTrees = 0;

    while (curPos.y < map.length) {
        if (map[curPos.y][curPos.x] === '#')
            hitedTrees++;
        curPos.x = (curPos.x + posSpeed.x) % mapXLimit;
        curPos.y += posSpeed.y;
    }
    console.log(`Number of hited trees: ${hitedTrees}`);
}
