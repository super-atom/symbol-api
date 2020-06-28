export function isEmptyData(data: any): boolean {
    if (typeof data === 'number') return false;
    if (data === null) return true;
    else if (data === '') return true
    else if (data === undefined) return true;
    // FIXME: 재귀 검사 필요
    else if (Array.isArray(data) && data.length === 0) return true;
    else if (Object.keys(data).length === 0) return true;
    else return false;
}