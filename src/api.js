const baseUrl = 'https://swapi.dev/api/';

const fetchData = async (type, page = 1) => {
    const url = new URL(type, baseUrl);
    url.searchParams.append('page', page);
    const response = await fetch(url).then((res) => res.json());
    return response
}

const fetchResources = async (type, page = 1) => {
    const { results: resources } = await fetchData(type, page);
    return resources
}

const fetchTitles = async (type, page) => {
    const resources = await fetchResources(type, page);
    return resources.map((resource) => {
        const { name, title, url } = resource;
        return {
            name: name || title,
            url
        }
    });
}

const fetchPageCount = async (type) => {
    const { count } = await fetchData(type);
    return Math.ceil((parseInt(count) || 0) / 10);
}

const fetchResource = async (url) => {
    const response = await fetch(url).then((res) => res.json());
    return response
}

export {
    fetchData,
    fetchResources,
    fetchTitles,
    fetchPageCount,
    fetchResource
}
