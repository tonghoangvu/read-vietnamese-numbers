import IReadConfig from './IReadConfig';
import INumberData from './INumberData';

const NEGATIVE_SIGN: string = '-';
const POINT_SIGN: string = '.';
const DIGITS_PER_PART: number = 3;
const FILLED_DIGIT: string = '0';
const INVALID_NUMBER: string = 'Số không hợp lệ';

const NEGATIVE_WORD: string = 'âm';
const POINT_WORD: string = 'chấm';
const ODD_WORD: string = 'lẻ';
const HUNDRED_WORD: string = 'trăm';
const TEN_WORD: string = 'mười';
const TEN_TONE_WORD: string = 'mươi';
const ONE_TONE_WORD: string = 'mốt';
const FOUR_TONE_WORD: string = 'tư';
const FIVE_TONE_WORD: string = 'lăm';

const VN_DIGITS: string[] = [
    'không', 'một', 'hai', 'ba', 'bốn',
    'năm', 'sáu', 'bảy', 'tám', 'chín'
];

const VN_UNITS: string[][] = [
    [], ['nghìn'], ['triệu'], ['tỉ'],
    ['nghìn', 'tỉ'], ['triệu', 'tỉ'], ['tỉ', 'tỉ']
];

function readTwoDigits(b: number, c: number, hasHundred: boolean): string[] {
    let output: string[] = [];

    switch (b) {
        case 0: {
            if (hasHundred && c == 0)
                break;
            if (hasHundred)
                output.push(ODD_WORD);
            output.push(VN_DIGITS[c]);
            break;
        }

        case 1: {
            output.push(TEN_WORD);
            if (c == 5)
                output.push(FIVE_TONE_WORD);
            else if (c != 0)
                output.push(VN_DIGITS[c]);
            break;
        }

        default: {
            output.push(VN_DIGITS[b], TEN_TONE_WORD);
            if (c == 1)
                output.push(ONE_TONE_WORD);
            else if (c == 4 && b != 4)
                output.push(FOUR_TONE_WORD);
            else if (c == 5)
                output.push(FIVE_TONE_WORD);
            else if (c != 0)
                output.push(VN_DIGITS[c]);
            break;
        }
    }

    return output;
}

function readThreeDigits(a: number, b: number, c: number, readZeroHundred: boolean): string[] {
    let output: string[] = [];

    // Read hundred even zero, apply for all parts, except the first part (on the left)
    if (a != 0 || readZeroHundred)
        output.push(VN_DIGITS[a], HUNDRED_WORD);

    output.push(...readTwoDigits(b, c, a != 0 || readZeroHundred));

    return output;
}

function parseNumberData(numberStr: string): INumberData {
    // Remove negative sign
    let isNegative: boolean = numberStr[0] == NEGATIVE_SIGN;
    let rawStr = (isNegative) ? numberStr.substr(1) : numberStr;

    // Remove leading 0s
    let pos: number = 0;
    while (rawStr[pos] == FILLED_DIGIT)
        pos++;
    rawStr = rawStr.substring(pos);

    // Remove trailing 0s
    let lastPos = rawStr.length - 1;
    while (rawStr[lastPos] == FILLED_DIGIT)
        lastPos--;
    rawStr = rawStr.substring(0, lastPos + 1);

    // Count 0s to add
    let pointPos: number = rawStr.indexOf(POINT_SIGN);
    let beforePointLength: number = (pointPos == -1)
        ? rawStr.length : pointPos;
    let needZeroCount: number = 0;
    const modZeroCount: number = beforePointLength % DIGITS_PER_PART;
    if (modZeroCount != 0)
        needZeroCount = DIGITS_PER_PART - modZeroCount;

    // Add leading 0s to fit parts
    let fullStr = '';
    let i: number;
    for (i = 0; i < needZeroCount; i++)
        fullStr += FILLED_DIGIT;
    fullStr += rawStr;

    // Parse digits
    let digit: number;
    let digits: number[] = [];
    let digitsAfterPoint: number[] = [];

    pointPos = fullStr.indexOf(POINT_SIGN);
    for (i = 0; i < fullStr.length; i++)
        if (fullStr[i] != POINT_SIGN) {
            digit = parseInt(fullStr[i]);
            if (isNaN(digit))
                throw new Error(INVALID_NUMBER);
            if (pointPos == -1 || i < pointPos)
                digits.push(digit);
            else
                digitsAfterPoint.push(digit);
        }

    // Building result
    let result: INumberData = { isNegative, digits, digitsAfterPoint };
    return result;
}

function readVietnameseNumber(numberData: INumberData, config: IReadConfig) {
    let output: string[] = [];

    let i: number, a: number, b: number, c: number;
    let isFirstPart: boolean, isSinglePart: boolean;
    let partCount: number = Math.round(numberData.digits.length / DIGITS_PER_PART);

    // Read before point digits
    for (i = 0; i < partCount; i++) {
        a = numberData.digits[i * DIGITS_PER_PART];
        b = numberData.digits[i * DIGITS_PER_PART + 1];
        c = numberData.digits[i * DIGITS_PER_PART + 2];

        isFirstPart = i == 0;
        isSinglePart = partCount == 1;
        if (a != 0 || b != 0 || c != 0 || isSinglePart)
            output.push(
                ...readThreeDigits(a, b, c, !isFirstPart),
                ...VN_UNITS[partCount - i - 1]);
    }

    // Read after point digits
    if (numberData.digitsAfterPoint.length != 0) {
        output.push(POINT_WORD);
        if (numberData.digitsAfterPoint.length == 2) {
            b = numberData.digitsAfterPoint[0];
            c = numberData.digitsAfterPoint[1];
            output.push(...readTwoDigits(b, c, false));
        } else
            for (i = 0; i < numberData.digitsAfterPoint.length; i++)
                output.push(VN_DIGITS[numberData.digitsAfterPoint[i]]);
    }

    // Add sign and units
    if (numberData.isNegative)
        output.unshift(NEGATIVE_WORD);
    output.push(config.unit);

    // Return joined result
    return output.join(config.separator);
}

export default {
    readTwoDigits, readThreeDigits, parseNumberData, readVietnameseNumber
}
