import { Box, Flex, Image, Text } from "@chakra-ui/react";

interface CardProps {
    original_title: string
    poster_path: string
}

export function Card({ original_title, poster_path  }: CardProps){

    return(
        <Flex
            maxW="240px"
            align="center"
            justify="center"
            cursor="pointer"
            bg="white"
            shadow="lg"
            borderWidth="1px"
            borderRadius='lg'
        >
            <Box w="100%" maxW="sm" h="full">
                <Image
                    borderTopRadius='lg'
                    // maxW="15rem"
                    w="100%"
                    src={poster_path}
                    alt={original_title}
                    fallbackSrc='https://via.placeholder.com/238x357/60'
                />
                <Box
                    as="div"
                    display="flex"
                    w="100%"
                    justifyContent="center"
                >
                    <Text
                        color="black"
                        fontSize="lg"
                        fontWeight="bold"
                        mt="2"
                        noOfLines={1}
                    >
                        {original_title}
                    </Text>
                </Box>
            </Box>
        </Flex>
    )
}