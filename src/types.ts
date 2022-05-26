export interface Movie {
    backdrop_path: string
    id: number
    original_title: string
    overview: string
    poster_path: string
    vote_average: number
}

interface Genre {
    id: number
    name: string
}

export interface Company {
    id: number
    logo_path: string
    name: string
    origin_country: string
}

interface Country {
    iso_3166_1: string
    name: string
}

interface Language {
    english_name: string
    iso_639_1: string
    name: string
}

export interface MovieDetail {
    id: number
    backdrop_path: string
    belongs_to_collection: {
        id: number
        name: string
        poster_path: string
        backdrop_path: string
    }
    genres: Genre[]
    original_language: string
    original_title: string
    overview: string
    poster_path: string
    production_companies: Company[]
    production_countries: Country[]
    release_date: string
    runtime: number
    spoken_languages: Language[]
    status: string
    vote_average: number
}