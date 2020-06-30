export const paginate = (page: number, pageSize: number, query: object): object => {
    const offset = (Number(page) * Number(pageSize));
    const limit = Number(pageSize);

    return {
        ...query,
        offset,
        limit
    }
}