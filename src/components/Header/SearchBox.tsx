import { Flex, Icon, Input } from "@chakra-ui/react";
import { SyntheticEvent } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useMovie } from "../../context/useMovie";

export function SearchBox(){
    const { searchMovies, search, setSearch } = useMovie()

    return(
        <Flex as="form" w="auto" onSubmit={(e: SyntheticEvent) => searchMovies(e)}>
            <Flex
                as="label"
                maxWidth={400}
                flex="1"
                py="4"
                px="8"
                ml={{
                    base: "0",
                    sm: "6",
                    md: "6",
                    lg: "6",
                    xl: "6"
                }}
                alignSelf="center"
                color="gray.200"
                position="relative"
                bg="gray.800"
                borderRadius="full"
                >
                    <Input
                        color="gray.50"
                        variant="unstyled"
                        px="4"
                        mr="4"
                        placeholder="Search on the platform"
                        _placeholder={{ color: 'yellow.100'}}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Icon as={RiSearchLine} fontSize="20" />
            </Flex>
        </Flex>
    )
}