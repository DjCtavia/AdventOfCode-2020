const path = require('path');
const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, 'input.txt')),
    console: false
});

// Containing numbers input
let passwords = [];

readInterface.on('line', (line) => {
    passwords.push(line);
});

readInterface.on('close', () => {
    Part1();
});

function Part1() {
    console.log("---Part 1 ---");
    const regex = /^(\d+)-(\d+) ([\w]): (\w+)$/;
    let validPasswords = 0;

    for (let iPassword = 0; iPassword < passwords.length; iPassword++) {
        const capturedGroups = passwords[iPassword].match(regex);
        let count = 0;
        
        for (let iLetter = 0; iLetter < capturedGroups[4].length; iLetter++)
            if (capturedGroups[4][iLetter] === capturedGroups[3])
                count++;
        if (capturedGroups[1] <= count && count <= capturedGroups[2]) validPasswords++;
    }
    console.log(`Valid passwords: ${validPasswords}`);
}