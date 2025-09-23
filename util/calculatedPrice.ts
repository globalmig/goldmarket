const weightRateMap: Record<number, number> = {
        0.2: 0.054, 0.3: 0.08, 0.5: 0.134, 1: 0.27, 1.875: 0.5, 3.75: 1,
        5: 1.3, 7.5: 2, 10: 2.67, 11.25: 3, 18.75: 5, 37.5: 10,
        45: 12, 50: 13.33, 75: 20, 100: 26.67, 112.5: 30, 187.5: 50, 375: 100, 500: 133.33, 1000: 266.67
    }

const weightPlusMap: Record<number, number> = {
        0.2: 30000, 0.3: 30000, 0.5: 30000,
        1: 40000, 1.875: 40000, 3.75: 40000,
        5: 60000, 7.5: 60000, 10: 60000, 11.25: 60000,
        18.75: 50000
    }

export const getCalculatedPrice = (goldPrice: number, weight: number, rate: number) => {
    return Math.round((goldPrice * (weightRateMap[weight] ?? 1) * rate));
}

export const displayPrice = (price:number, weight: number) => {
    const roundedPrice = price !== undefined
        ? Math.ceil(price / 1000) * 1000
        : undefined;
    return roundedPrice && roundedPrice + (weightPlusMap[weight] ?? 0);
}