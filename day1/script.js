const path = require('path');
const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, 'input.txt')),
    console: false
});

// Containing numbers input
let numbers = [];

readInterface.on('line', (line) => {
    numbers.push(Number(line));
});

readInterface.on('close', () => {
    Part1();
    Part2();
});

function Part1() {
    console.log("---Part 1 ---");
    for (let iNumber = 0; iNumber < numbers.length - 1; iNumber++) {
        for (let iMultiplier = iNumber + 1; iMultiplier < numbers.length; iMultiplier++) {
            if (numbers[iNumber] + numbers[iMultiplier] === 2020) {
                console.log(`${numbers[iNumber]} x ${numbers[iMultiplier]} = ${numbers[iNumber] * numbers[iMultiplier]}`);
            }
        }
    }
}

function Part2() {
    console.log("---Part 2 ---");
    for (let iFNumber = 0; iFNumber < numbers.length - 2; iFNumber++) {
        for (let iSNumber = iFNumber + 1; iSNumber < numbers.length - 1; iSNumber++) {
            for (let iTNumber = iSNumber + 1; iTNumber < numbers.length; iTNumber++) {
                if (numbers[iFNumber] + numbers[iSNumber] + numbers[iTNumber] === 2020) {
                    console.log(`${numbers[iFNumber]} x ${numbers[iSNumber]} x ${numbers[iTNumber]} = ${numbers[iFNumber] * numbers[iSNumber] * numbers[iTNumber]}`);
                }
            }
        }
    }
}