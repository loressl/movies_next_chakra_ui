import { 
    Box, 
    Flex, 
    Heading, 
    useToast, 
    Image,
    Text,
    Stack,
    Icon
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { getMovieOnClick } from "../../services/movies";
import { Company, MovieDetail } from "../../types";
import { format } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import { AiFillStar } from 'react-icons/ai'
import { Slider } from "../../components/Slider";
import { SliderItem } from "../../components/Slider/SliderItem";
import { Item } from "../../components/Item";


import { SwiperSlide } from "swiper/react";
import Head from "next/head";


interface DetailProps {
    movie: MovieDetail
    error: boolean
}

export default function Detail({ movie, error }: DetailProps) {
    const toast = useToast()
    const genres = movie.genres.map(genre => genre.name).join(', ')
    const productionCountries =  movie.production_countries.map(country=> country.iso_3166_1).join(', ')
    const spokenLanguages = movie.spoken_languages.map(language=> language.english_name).join(', ')

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

    return(
        <>
            <Head>
                <title>{movie.original_title}</title>
            </Head>
            <Flex
                w="100%"
                maxH="100%"
                justify="center"
                align="center"
            >
                <Stack
                    direction={['column', 'column', 'row']} 
                    spacing={["4", "4", "6"]}
                    w="100%"
                    h="auto"
                    maxW="1460px"
                    p="5"
                    display='flex'
                    align={['center', 'center', 'flex-start', 'flex-start']}
                    justifyContent="center"
                >
                    <Box maxW="sm">
                        <Image
                            borderRadius="2xl"
                            shadow="dark-lg"
                            maxW="18rem"
                            w="100%"
                            src={movie.poster_path}
                            alt={movie.original_title}
                            fallbackSrc='https://via.placeholder.com/288x432/60'
                            loading='lazy'
                        />
                    </Box>
                    <Stack 
                        align={['center', 'center', 'flex-start', 'flex-start']}
                        direction="column"
                        maxW="full"
                    >
                        <Heading>{movie.original_title}</Heading>
                        <Stack 
                            direction={['column', 'row']} 
                            spacing={['2px','24px']}
                            mt="2"
                        >
                            <Text
                                fontSize="sm"
                                color="gray.400"
                            >
                                {format(new Date(movie.release_date), 'dd MMMM yyyy', { locale: enUS})}
                            </Text>
                            <Text fontSize="sm" color="gray.400">
                                {movie.runtime} min
                            </Text>
                            <Stack align="center" direction="row" spacing="5px">
                                <Icon color="yellow.400" as={AiFillStar} fontSize="15" />
                                <Text fontSize="sm" color="gray.400">
                                    {movie.vote_average}
                                </Text>
                            </Stack>
                        </Stack>
                        <Item title="Genres" items={genres} />
                        <Item title="Production Countries" items={productionCountries} />
                        <Item title="Spoken Languages" items={spokenLanguages} />
                        <Box mt="2" maxW="xl">
                            <Text
                                textAlign={["center", "center","justify"]}
                                color="gray.400"
                            >
                                {movie.overview}
                            </Text>
                        </Box>
                        <Flex align="center" flexDirection="column" mt="3" maxW="xl" w="100%">
                            <Text
                                color="gray.400"
                                fontWeight="bold"
                            >
                                Product Companies
                            </Text>
                            <Slider 
                                settings={{
                                    cssMode: true,
                                    slidesPerView: 1,
                                    pagination: {clickable: true, dynamicBullets: true},
                                    mousewheel: true,
                                    keyboard: true,
                                    style: {width: '100%', height: '100%', flex: '1', maxWidth:'265px'}
                                }}
                            >
                                {movie?.production_companies.map((company) => (
                                    <SwiperSlide key={company.id}>
                                        <SliderItem 
                                            src={company.logo_path}
                                            name={company.name}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Slider>
                        </Flex>
                    </Stack>
                </Stack>
            </Flex>
        </>
    )
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps:GetStaticProps = async ({params}) => {
    let error = false
    const { slug } = params
    const response = await getMovieOnClick(Number(slug)).then(resp => resp.data).catch(() => error = true)
    
    const movie = {
        id: response?.id,
        backdrop_path: response?.backdrop_path && process.env.NEXT_PUBLIC_URL_IMAGE + response?.backdrop_path,
        belongs_to_collection: response?.belongs_to_collection && {
            id: response?.belongs_to_collection?.id,
            name: response?.belongs_to_collection?.name,
            poster_path: process.env.NEXT_PUBLIC_URL_IMAGE + response?.belongs_to_collection?.poster_path,
            backdrop_path: process.env.NEXT_PUBLIC_URL_IMAGE + response?.belongs_to_collection?.backdrop_path
        },
        genres: response?.genres,
        original_language: response?.original_language,
        original_title: response?.original_title,
        overview: response?.overview,
        poster_path: response?.poster_path && process.env.NEXT_PUBLIC_URL_IMAGE + response?.poster_path,
        production_companies: response?.production_companies?.map((data: Company) => {
            return {
                id: data?.id,
                logo_path: data?.logo_path && process.env.NEXT_PUBLIC_URL_IMAGE + data?.logo_path,
                name: data?.name,
                origin_country: data?.origin_country
            }
        }),
        production_countries: response?.production_countries,
        release_date: response?.release_date,
        runtime: response?.runtime,
        spoken_languages: response?.spoken_languages,
        status: response?.status,
        vote_average: response?.vote_average
    }

    return {
        props: { 
            movie,
            error
         },
        redirect: 60 * 30
    }
}