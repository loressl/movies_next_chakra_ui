import { api } from "./api"

const params = {
    api_key: process.env.NEXT_PUBLIC_API_KEY,
}

export const getMovies = async (page: number) => {
    const newParams = {
        ...params,
        page
    }
    return await api.get('/movie/popular', { params: newParams })
}

export const getMovieOnClick = async (id: number) => {
    return await api.get(`/movie/${id}`, { params })
}

export const getMovieSearch = async (query: string, page: number) => {
    const newParams= {
        ...params,
        query,
        page
    }
    return await api.get('/search/movie', { params: newParams })
}