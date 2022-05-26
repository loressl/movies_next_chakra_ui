import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
    fonts: {
        heading: 'Roboto',
        body: 'Roboto'
    },
    styles: {
        global: {
            body: {
                bg: 'gray.900',
                color: 'gray.50'
            }
        },
    },
    breakpoints: {
        sm: '350px',
        md: '768px',
        lg: '960px',
        xl: '1200px',
        '2xl': '1536px',
    }
})