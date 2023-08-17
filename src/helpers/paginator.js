export function paginate( data, startIndex, endIndex, page, limit, http ) {
    const results = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / limit);

    const links = {};
    links.first = `${http}?page=1&limit=${limit}`
    links.last = `${http}?page=${totalPages}&limit=${limit}`
    if (page < totalPages) {
        links.next = `${http}?page=${page + 1}&limit=${limit}`;
    }

    if (page > 1) {
        links.prev = `${http}?page=${page - 1}&limit=${limit}`;
    }
    links.all = []
    for (let i = 1; i < totalPages + 1; i++) {
        links.all.push({ page: i, link: `${http}?page=${i}&limit=${limit}` })

    }
    return {results, totalPages, links, page }
}