export const paginate = (page, pageSize, query) => {
    const offset = (Number(page) * Number(pageSize));
    const limit = Number(pageSize);

    return {
        ...query,
        offset,
        limit
    }
}