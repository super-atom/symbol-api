export function paginate(page: number, pageSize: number, query: object): object {
    if (page <= 0) page = 1;
    const offset = (Number(page - 1) * Number(pageSize));
    const limit = Number(pageSize);

    return {
        ...query,
        offset,
        limit
    }
}