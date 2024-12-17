export function getAfterHyphen(str: string) {
    return str.split('-')[1];
}

export function getBeforeHyphen(str: string) {
    return str.split('-')[0];
}

export function getStorageValue(storage: string) {
    let words = storage.split(' ');
    let strValue = words[words.length - 1];

    let multiplier = 1;
    let value = parseFloat(strValue.slice(0, -2));
    let measurement = strValue.slice(-2);

    switch (measurement) {
        case 'TB':
            multiplier = 1000;
            break;
        case 'GB':
            multiplier = 1;
            break;
        default:
            multiplier = 1;
            break;
    }

    return value * multiplier;

}