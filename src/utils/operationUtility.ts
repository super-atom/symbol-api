export function isEmptyObject(data: object): boolean {
    if (Array.isArray(data) && data.length === 0) return true;
    else if (Object.keys(data).length === 0) return true;
    else return false;
}

export function isEmptyData(data: any): boolean {
    if (typeof data === 'number') return false;
    else if (data === null) return true;
    else if (data === '') return true
    else if (data === undefined) return true;
    else if (isEmptyObject(data)) return true;
    else return false;
}