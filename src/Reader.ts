import IReadConfig from './IReadConfig';

const VN_DIGITS: string[] = [
    'không', 'một', 'hai', 'ba', 'bốn',
    'năm', 'sáu', 'bảy', 'tám', 'chín'
];
const VN_UNITS: string[][] = [
    [], ['nghìn'], ['triệu'], ['tỉ'],
    ['nghìn', 'tỉ'], ['triệu', 'tỉ'], ['tỉ', 'tỉ']
];

function readTwoDigits(b, c: number, hasHundred: boolean): string[] {
    let output: string[] = [];

    switch (b) {
        case 0: {
            if (hasHundred && c == 0)
                break;
            if (hasHundred)
                output.push('lẻ');
            output.push(VN_DIGITS[c]);
            break;
        }

        case 1: {
            output.push('mười');
            if (c == 5)
                output.push('lăm');
            else if (c != 0)
                output.push(VN_DIGITS[c]);
            break;
        }

        default: {
            output.push(VN_DIGITS[b], 'mươi');
            if (c == 1)
                output.push('mốt');
            else if (c == 4 && b != 4)
                output.push('tư');
            else if (c == 5)
                output.push('lăm');
            else if (c != 0)
                output.push(VN_DIGITS[c]);
            break;
        }
    }

    return output;
}

function readThreeDigits(a, b, c: number, readZeroHundred: boolean): string[] {
    let output: string[] = [];

    if (a == 0) {
        if (readZeroHundred)
            output.push('không', 'trăm');
    } else
        output.push(VN_DIGITS[a], 'trăm');

    output.push(...readTwoDigits(b, c, a != 0 || readZeroHundred));

    return output;
}

function readVietnameseNumbers(number: number, config: IReadConfig) {
    let output: string[] = [];

    // Find count of need zero
    const rawNumStr: string = number.toString();
    let needZeroCount: number = 0;
    const modZeroCount: number = rawNumStr.length % 3;
    if (modZeroCount != 0)
        needZeroCount = 3 - modZeroCount;

    // Append need zeros before
    let fullNumStr: string = '';
    for (let i: number = 0; i < needZeroCount; i++)
        fullNumStr += '0';
    fullNumStr += rawNumStr;

    // Split each 3 elements
    let partCount: number = Math.round(fullNumStr.length / 3);
    for (let i: number = 0; i < partCount; i++) {
        let a: number = parseInt(fullNumStr[i * 3]);
        let b: number = parseInt(fullNumStr[i * 3 + 1]);
        let c: number = parseInt(fullNumStr[i * 3 + 2]);

        let isFirstPart: boolean = i == 0;
        if (a != 0 || b != 0 || c != 0 || !config.skipEmptyPart)
            output.push(
                ...readThreeDigits(a, b, c, !isFirstPart),
                ...VN_UNITS[partCount - i - 1]);
    }

    // Build result as string
    output.push(config.unit);
    let result: string = output.join(config.separator);

    return result;
}

export default { readTwoDigits, readThreeDigits, readVietnameseNumbers };
