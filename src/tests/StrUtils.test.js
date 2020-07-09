import {bytesToStr, dateToStr} from "../utilities/StrUtils";

describe('date', () => {
    test('datetime to string format success', () => {
        const strDate = "2020-03-21T14:03:04"

        expect(dateToStr(strDate)).toBe('21 Mar, 2020')
    });
});

describe('file size', () => {
    test('file size to string with empty file size should be 0 Byres', () => {
        const expectFileSizeStr = '0 Bytes'
        const fileSize = 0

        expect(bytesToStr(fileSize)).toBe(expectFileSizeStr);
    });

    test('file size = 1024 bytes to string should be 1 KB', () => {
        const expectFileSizeStr = '1 KB'
        const fileSize = 1024

        expect(bytesToStr(fileSize)).toBe(expectFileSizeStr);
    });

});


