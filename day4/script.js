const path = require('path');
const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, 'input.txt')),
    console: false
});

const g_idsInfo = [];

readInterface.on('line', (line) => {
    g_idsInfo.push(line);
});

readInterface.on('close', () => {
    let arrPass = GetAllPassports(g_idsInfo);

    Part1(arrPass);
});

/*
    Passport class

    Note: It could has been done more easily with an array, but yeah,
    why doing it simple when you can complicate it?
*/
class passportValidator {
    _byr;
    _iyr;
    _eyr;
    _hgt;
    _hcl;
    _ecl;
    _pid;
    _cid;

    isValid() {
        if (this._byr == null) return false;
        if (this._iyr == null) return false;
        if (this._eyr == null) return false;
        if (this._hgt == null) return false;
        if (this._hcl == null) return false;
        if (this._ecl == null) return false;
        if (this._pid == null) return false;
        return true;
    }

    isFullyValid() {
        return this.isValid() && this._cid != null;
    }

    findInformations(line) {
        this._getBirth(line);
        this._getIssueYear(line);
        this._getExpirationYear(line);
        this._getHeight(line);
        this._getHairColor(line);
        this._getEyeColor(line);
        this._getPassportID(line);
        this._getCountryID(line);
    }

    displayInfo() {
        console.log("--- Pass informations ---");
        console.log(`Birth Year: ${this._byr}`);
        console.log(`Issue Year: ${this._iyr}`);
        console.log(`Expiration year: ${this._eyr}`);
        console.log(`Height: ${this._hgt}`);
        console.log(`Hair color: ${this._hcl}`);
        console.log(`Eye color: ${this._ecl}`);
        console.log(`Passport ID: ${this._pid}`);
        console.log(`Country ID: ${this._cid}`);
    }

    _getBirth(line) {
        const regByr = /byr:(\d{4})/;
        const regArr = line.match(regByr);

        if (regArr && regArr[1] != null && regArr[1] > 1920)
            this._byr = regArr[1];
    }

    _getIssueYear(line) {
        const regIyr = /iyr:(\d{4})/;
        const regArr = line.match(regIyr);

        if (regArr && regArr[1] != null && 1999 < regArr[1] && regArr[1] < 2050)
            this._iyr = regArr[1];
    }

    _getExpirationYear(line) {
        const regEyr = /eyr:(\d{4})/;
        const regArr = line.match(regEyr);

        if (regArr && regArr[1] != null && 1999 < regArr[1] && regArr[1] < 2050)
            this._eyr = regArr[1];
    }

    _getHeight(line) {
        const regHgt = /hgt:(\d{1,3})(cm|in)/
        const regArr = line.match(regHgt);

        if (regArr && regArr[1] != null) {
            if (regArr[2] == 'cm' && 139 < regArr[1] && regArr[1] < 210)
                this._hgt = regArr[1];
            else if (regArr[2] == 'in' && 55 < regArr[1] && regArr[1] < 80)
                this._hgt = regArr[1];
        }
    }

    _getHairColor(line) {
        const regHcl = /hcl:(#[0-9a-fA-F]{6})/
        const regArr = line.match(regHcl);

        if (regArr && regArr[1] != null)
            this._hcl = regArr[1];
    }

    _getEyeColor(line) {
        const regEcl = /ecl:([a-zA-Z]{3})/
        const regArr = line.match(regEcl);

        if (regArr && regArr[1])
            this._ecl = regArr[1];
    }

    _getPassportID(line) {
        const regPid = /pid:(\d{9})/;
        const regArr = line.match(regPid);

        if (regArr && regArr[1] != null)
            this._pid = regArr[1];
    }

    _getCountryID(line) {
        const regCid = /cid:(\d{1,3})/;
        const regArr = line.match(regCid);

        if (regArr && regArr[1] != null)
            this._cid = regArr[1];
    }
}

function GetAllPassports(idsInfo) {
    let isPassCreated = false;
    let iPass = -1;
    let arrPassports = [];

    for (let iInfo = 0; iInfo < idsInfo.length; iInfo++) {
        if (idsInfo[iInfo].length === 0) {
            isPassCreated = false;
            continue;
        }
        if (!isPassCreated) {
            arrPassports.push(new passportValidator());
            iPass++;
            isPassCreated = true;
        }
        arrPassports[iPass].findInformations(idsInfo[iInfo]);
    }
    return arrPassports;
}

function Part1(arrPass) {
    console.log("--- Part 1 ---");
    let nbrPassValid = 0;

    arrPass.forEach((pass, index) => {
        if (pass.isValid())
            nbrPassValid++;
    });
    console.log(`Number of passports: ${arrPass.length}`);
    console.log(`Valid passports found: ${nbrPassValid}`);
}