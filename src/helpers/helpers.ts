export const unwrapTimeframe = (timeframe: string) => {
    const end = new Date();
    let start = new Date();
    switch (timeframe) {
        case "week":
            start.setDate(end.getDate() - 7);
            break;
        case "month":
            start.setMonth(end.getMonth() - 1);
            break;
        case "halfyear":
        case "months":
            start.setMonth(end.getMonth() - 6);
            break;
        case "year":
            start.setFullYear(end.getFullYear() - 1);
            break;
    }
    return [ start, end ] as const;
}
