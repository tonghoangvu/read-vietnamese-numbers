import INumberData from './INumberData';
import Config from './Config';

function readTwoDigits(b: number, c: number, hasHundred: boolean): string[] {
    const output: string[] = [];

    switch (b) {
        case 0: {
            if (hasHundred && c == 0)
                break;
            if (hasHundred)
                output.push(Config.ODD_TEXT);
            output.push(Config.DIGITS[c]);
            break;
        }

        case 1: {
            output.push(Config.TEN_TEXT);
            if (c == 5)
                output.push(Config.FIVE_TONE_TEXT);
            else if (c != 0)
                output.push(Config.DIGITS[c]);
            break;
        }

        default: {
            output.push(Config.DIGITS[b], Config.TEN_TONE_TEXT);
            if (c == 1)
                output.push(Config.ONE_TONE_TEXT);
            else if (c == 4 && b != 4)
                output.push(Config.FOUR_TONE_TEXT);
            else if (c == 5)
                output.push(Config.FIVE_TONE_TEXT);
            else if (c != 0)
                output.push(Config.DIGITS[c]);
            break;
        }
    }

    return output;
}

function readThreeDigits(a: number, b: number, c: number, readZeroHundred: boolean): string[] {
    const output: string[] = [];

    // Read hundred even zero, apply for all parts, except the first part (on the left)
    if (a != 0 || readZeroHundred)
        output.push(Config.DIGITS[a], Config.HUNDRED_TEXT);

    output.push(...readTwoDigits(b, c, a != 0 || readZeroHundred));

    return output;
}

function parseNumberData(numberStr: string): INumberData {
    // Remove negative sign
    const isNegative: boolean = numberStr[0] == Config.NEGATIVE_SIGN;
    let rawStr: string = (isNegative) ? numberStr.substring(1) : numberStr;
    let pointPos: number = rawStr.indexOf(Config.POINT_SIGN);

    // Remove leading 0s
    let pos = 0;
    while (rawStr[pos] == Config.FILLED_DIGIT)
        pos++;
    rawStr = rawStr.substring(pos);

    // Remove trailing 0s (if has point)
    if (pointPos != -1) {
        let lastPos: number = rawStr.length - 1;
        while (rawStr[lastPos] == Config.FILLED_DIGIT)
            lastPos--;
        rawStr = rawStr.substring(0, lastPos + 1);
    }

    // Count 0s to add
    pointPos = rawStr.indexOf(Config.POINT_SIGN);
    const beforePointLength: number = (pointPos == -1)
        ? rawStr.length : pointPos;
    let needZeroCount = 0;
    const modZeroCount: number = beforePointLength % Config.DIGITS_PER_PART;
    if (modZeroCount != 0)
        needZeroCount = Config.DIGITS_PER_PART - modZeroCount;

    // Add leading 0s to fit parts
    let fullStr = '';
    let i: number;
    for (i = 0; i < needZeroCount; i++)
        fullStr += Config.FILLED_DIGIT;
    fullStr += rawStr;

    // Parse digits
    let digit: number;
    const digits: number[] = [];
    const digitsAfterPoint: number[] = [];

    pointPos = fullStr.indexOf(Config.POINT_SIGN);
    for (i = 0; i < fullStr.length; i++)
        if (i != pointPos) {
            digit = parseInt(fullStr[i]);
            if (isNaN(digit))
                throw new Error('Số không hợp lệ');
            if (pointPos == -1 || i < pointPos)
                digits.push(digit);
            else
                digitsAfterPoint.push(digit);
        }

    // Building result
    const result: INumberData = { isNegative, digits, digitsAfterPoint };
    return result;
}

function readVietnameseNumber(numberData: INumberData): string {
    const output: string[] = [];

    let i: number, a: number, b: number, c: number;
    let isFirstPart: boolean, isSinglePart: boolean;
    const partCount: number = Math.round(numberData.digits.length / Config.DIGITS_PER_PART);

    // Read before point digits
    for (i = 0; i < partCount; i++) {
        a = numberData.digits[i * Config.DIGITS_PER_PART];
        b = numberData.digits[i * Config.DIGITS_PER_PART + 1];
        c = numberData.digits[i * Config.DIGITS_PER_PART + 2];

        isFirstPart = i == 0;
        isSinglePart = partCount == 1;
        if (a != 0 || b != 0 || c != 0 || isSinglePart)
            output.push(
                ...readThreeDigits(a, b, c, !isFirstPart),
                ...Config.UNITS[partCount - i - 1]);
    }

    // Read after point digits
    if (numberData.digitsAfterPoint.length != 0) {
        output.push(Config.POINT_TEXT);
        if (numberData.digitsAfterPoint.length == 2) {
            b = numberData.digitsAfterPoint[0];
            c = numberData.digitsAfterPoint[1];
            output.push(...readTwoDigits(b, c, false));
        } else
            for (i = 0; i < numberData.digitsAfterPoint.length; i++)
                output.push(Config.DIGITS[numberData.digitsAfterPoint[i]]);
    }

    // Add sign and units
    if (numberData.isNegative)
        output.unshift(Config.NEGATIVE_TEXT);
    output.push(Config.UNIT);

    // Return joined result
    return output.join(Config.SEPARATOR);
}

export default {
    readTwoDigits, readThreeDigits, parseNumberData, readVietnameseNumber
};
