import {Text} from '@chakra-ui/react'

interface ItemProps {
    title: string
    items: string
}

export function Item({ title, items}: ItemProps){
    return(
        <Text
            mt='2'
            color="gray.400"
        >
            <strong>{title}:</strong> {items}
        </Text>
    )
}