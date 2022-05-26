import { Flex, Wrap, WrapItem, useToast, Heading, Button } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Head from 'next/head'
import Link from "next/link";
import { useState, useEffect } from 'react'
import { Card } from "../components/Card";
import { useMovie } from "../context/useMovie";
import { getMovies } from "../services/movies";
import { Movie } from '../types'

type MovieCard = Omit<Movie, 'vote_average' | 'overview'> 

interface HomeProps {
  listMovies: MovieCard[]
  error: boolean
}

export default function Home({ listMovies, error }: HomeProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const { movies, setMovies, loadingMoreMovie, loadButton} = useMovie()
  const toast = useToast()

  if (error) {
    toast({
        title: 'Error',
        description: 'Error loading data',
        status: "error",
        duration: 9000,
        isClosable: true
      })
    return (
      <Heading>😭</Heading>
    )
  }

  useEffect(() => {
    setMovies(listMovies)
  },[listMovies])

  const clickLoadMore = async () => {
    loadingMoreMovie(currentPage + 1)
    setCurrentPage((currentPage) => currentPage + 1)
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Flex
        w="100%"
        maxH="100%"
        justify="center"
        align="center"
        p="3"
        flexDirection="column"
      >
        <Wrap
          spacing={["4", "4", "6"]}
          justify="center"
          pb="1"
        >
          {!!movies.length && movies.map(movie => (
            <Link key={movie.id} href={`/detail/${movie.id}`}>
              <a>
                <WrapItem>
                  <Card
                    original_title={movie.original_title}
                    poster_path={movie.poster_path}
                  />
                </WrapItem>
              </a>
            </Link>
          ))}
        </Wrap>
        {loadButton.page <= loadButton.totalPages &&
          (
            <Button 
              w="100%"
              maxW="10rem"
              mt="2"
              bg="yellow.400"
              color="black"
              onClick={clickLoadMore}
            >
              Load more
            </Button>
          )
        }
      </Flex>
    </>
  )
}

export const getStaticProps: GetStaticProps = async() => {
  let error = false
  const response = await getMovies(1)
    .then((response) => response.data)
    .catch(() => error = true)
  
  const movies = response.results.map((data: Movie) => {
    if (data.poster_path) {
      return {
        id: data.id,
        original_title: data.original_title,
        poster_path: data.poster_path && process.env.NEXT_PUBLIC_URL_IMAGE + data.poster_path
      }
    }
    return
  }).filter((movie) => movie)

  return {
    props: {
      listMovies: movies,
      error
    }
  }
}
