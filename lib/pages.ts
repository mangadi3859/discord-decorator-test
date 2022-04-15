export default function <T = any>(arr: T[], perPage: number): T[] {
    let res: T[] = [];

    while (arr.length >= 1) {
        res.push(...arr.splice(0, perPage));
    }

    return res;
}
