interface IConfig {
    SEPARATOR: string;
    UNIT: string;

    DIGITS: string[];
    UNITS: string[][];

    NEGATIVE_SIGN: string;
    POINT_SIGN: string;
    DIGITS_PER_PART: number;
    FILLED_DIGIT: string;

    NEGATIVE_TEXT: string;
    POINT_TEXT: string;
    ODD_TEXT: string;
    TEN_TEXT: string;
    HUNDRED_TEXT: string;

    ONE_TONE_TEXT: string;
    FOUR_TONE_TEXT: string;
    FIVE_TONE_TEXT: string;
    TEN_TONE_TEXT: string;
}

const Config: IConfig = {
    SEPARATOR: ' ',
    UNIT: 'đơn vị',

    DIGITS: [
        'không', 'một', 'hai', 'ba', 'bốn',
        'năm', 'sáu', 'bảy', 'tám', 'chín'
    ],
    UNITS: [
        [], ['nghìn'], ['triệu'], ['tỉ'],
        ['nghìn', 'tỉ'], ['triệu', 'tỉ'], ['tỉ', 'tỉ']
    ],

    NEGATIVE_SIGN: '-',
    POINT_SIGN: '.',
    DIGITS_PER_PART: 3,
    FILLED_DIGIT: '0',

    NEGATIVE_TEXT: 'âm',
    POINT_TEXT: 'chấm',
    ODD_TEXT: 'lẻ',
    TEN_TEXT: 'mười',
    HUNDRED_TEXT: 'trăm',

    ONE_TONE_TEXT: 'mốt',
    FOUR_TONE_TEXT: 'tư',
    FIVE_TONE_TEXT: 'lăm',
    TEN_TONE_TEXT: 'mươi'
}

export default Config;
