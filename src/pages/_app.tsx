import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { Header } from '../components/Header'
import { MovieProvider } from '../context/useMovie'

import '../styles/global.scss'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <MovieProvider>
        <Header />
        <Component {...pageProps} />
      </MovieProvider>
    </ChakraProvider>
  )
}

export default MyApp
