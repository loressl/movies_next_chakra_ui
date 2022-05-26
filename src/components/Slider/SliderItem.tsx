import { Flex, Image, Text } from "@chakra-ui/react";

interface SliderItem {
    src: string
    name: string
}

export function SliderItem ({src, name}: SliderItem) {
    return (
        <Flex 
            width="100%" 
            justify="center" 
            alignItems="center" 
            h="150px"
            bgColor="yellow.50"
        >
            {src ?
                <Image 
                    width='45%'
                    objectFit="cover"
                    src={src}
                    alt={name}
                />: 
                <Text
                    color="gray.900"
                >
                    {name}
                </Text>}
        </Flex>
    )
}