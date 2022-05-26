import { useToast } from '@chakra-ui/react'
import { createContext, ReactNode, SyntheticEvent, useContext, useEffect, useState } from 'react'
import { getMovies, getMovieSearch } from '../services/movies'
import { Movie } from '../types'

interface MovieProviderProps {
    children: ReactNode
}

interface SearchPage {
    page: number
    totalPages: number
}

interface MovieContextData {
    movies: Movie[]
    setMovies: Function
    movieDetail: Movie
    loadingMoreMovie: (page: number) => void
    searchMovies: (event: SyntheticEvent) => void
    search: string
    setSearch: Function
    loadButton: SearchPage
}

const initialPage ={
    page: 0,
    totalPages:0 
}

const MovieContext = createContext<MovieContextData>({} as MovieContextData)

export function MovieProvider({ children }: MovieProviderProps) {
    const [movies, setMovies] = useState<Movie[]>([])
    const [moviePage, setMoviePage] = useState<SearchPage>(initialPage)
    const [saveMovies, setSaveMovies] = useState<Movie[]>([])
    const [search, setSearch] = useState('')
    const [searchPage, setSearchPage] = useState<SearchPage>(initialPage)
    const [loadButton, setLoadButton] = useState<SearchPage>(initialPage)
    const [movieDetail, setMovieDetail] = useState<Movie>()
    const toast = useToast()

    useEffect(() => {
        if(!search) {
            if(searchPage.page){
                setMovies(saveMovies)
                setSaveMovies([])
                setSearchPage(initialPage)
            } 
        }
    },[search])

    useEffect(() => {
        if(searchPage.page) {
            setLoadButton(searchPage)
        } else if (moviePage.page) {
            setLoadButton(moviePage)
        }
    }, [moviePage, searchPage])

    const msgError = (msg: string) => toast({
        title: 'Error',
        description: msg,
        status: "error",
        duration: 9000,
        isClosable: true
    })

    const loadingMoreMovie = async (page: number) =>{
        try {
            const response = await getMovies(page).then(response => response.data)
            const newMovies = response?.results.map((data: Movie) => {
                if (data.poster_path) {
                  return {
                    id: data.id,
                    original_title: data.original_title,
                    poster_path: data.poster_path && process.env.NEXT_PUBLIC_URL_IMAGE + data.poster_path
                  }
                }
                return
              }).filter((movie) => movie)
            setMovies((preMovies) => [...preMovies, ...newMovies])
            setMoviePage((prevData) => {
                const data = { ...prevData , page ,totalPages: response?.total_pages}
                return data
            })
        } catch (error) {
            msgError('Error loading data')
        }
    }

    const searchMovies = async (event: SyntheticEvent) =>{
        event.preventDefault()
        try {
            if (search.length > 3){
                const response = await getMovieSearch(search, 1).then(resp => resp.data)
                const newMovies = response?.results.map((data: Movie) => {
                    const movie = {
                        id: data.id,
                        original_title: data.original_title,
                        overview: data.overview,
                        vote_average: data.vote_average,
                        backdrop_path: data.backdrop_path && process.env.NEXT_PUBLIC_URL_IMAGE + data.backdrop_path,
                        poster_path: data.poster_path && process.env.NEXT_PUBLIC_URL_IMAGE + data.poster_path
                    }
                    return movie
                })
                setSaveMovies(movies)
                setMovies(newMovies)
                setSearchPage((prevData) => {
                    const data = { ...prevData ,page: 1 ,totalPages: response?.total_pages}
                    return data
                })
            } else {
                msgError('Search must have more than 3 letters')
            }
        } catch (error) {
            msgError('Error loading data')
        }
    }

    //TODO: FUNÇÃO DE LOAD DA PESQUISA
    //TODO: USAR DIRETO NO GETSTATIC E FAZER PÁGINA DINÂMICA DE PESQUISA DO CLIQUE E PAGINHA DINÂMICA

    return(
        <MovieContext.Provider
            value={{
                movies,
                setMovies,
                movieDetail,
                loadingMoreMovie,
                searchMovies,
                search,
                setSearch,
                loadButton
            }}
        >
            {children}
        </MovieContext.Provider>
    )
}

export const useMovie = () => useContext(MovieContext)